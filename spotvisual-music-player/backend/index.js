import express, { query } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { error } from 'console';

dotenv.config();

const app = express();
const port = 3001;

// const spotify_client_id = '1f42356ed83f46cc9ffd35c525fc8541';
// const spotify_client_secret = '';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spotify_client_id = '1f42356ed83f46cc9ffd35c525fc8541';
const spotify_client_secret = process.env.CLIENT_SECRET;
const spotify_redirect_uri = 'http://localhost:3000';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));




const generateRandomString = function (length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
// const clientId = '1f42356ed83f46cc9ffd35c525fc8541';
// 		const redirectUrl = "http://localhost:3001";
// 		const apiUrl = "https://accounts.spotify.com/authorize";
// 		const scope = [
// 			"user-read-email",
// 			"user-read-private",
// 			"user-modify-playback-state",
// 	  "user-read-playback-state",
// 	  "user-read-currently-playing",
// 	  "user-read-recently-played",
// 	  "user-read-playback-position",
// 	  "user-top-read",
// 	  "playlist-read-private",
// 		].join(' ');
// 		const url = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=code`;
// 		};
		
///authorization code 
app.get('/auth/login', (req, res) => { 
  const state = generateRandomString(16);
  const scope = 'streaming' + ' ' + 'user-read-email' + ' ' + 'user-read-private';
  const auth_query_parameters = new URLSearchParams({
    client_id: spotify_client_id,
    response_type: 'code',
    redirect_uri: 'http://localhost:3000',
    scope: scope,
    state: state,
  });

  console.log('Redirecting to Spotify Authorization...');
  console.log('State:', state);
  console.log('Scope:', scope);
  console.log(`https://accounts.spotify.com/authorize?${auth_query_parameters.toString()}`);

  res.redirect(`https://accounts.spotify.com/authorize?${auth_query_parameters.toString()}`);
});


// authrorization code exchange for access token
app.post('/callback', async (req, res) => {
  const code  = req.query.code;
  const state = req.query.state;
  if (!state || !code) {
    console.log('Bad Request: Missing required parameters');
    return res.status(400).json({ error: 'Bad Request' });
  }
  try {
    console.log('Exchanging authorization code for access token...');
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:3000',
    });
    const response = await axios.post('https://accounts.spotify.com/api/token', body.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(`${spotify_client_id}:${spotify_client_secret}`).toString('base64')
        },
      });
      const { access_token, refresh_token } = response.data;
      console.log('Access token and refresh token received:', access_token, refresh_token);
      return res.json({ access_token, refresh_token });
      }catch(error ) {
        console.log('Error exchanging authorization code for access token:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  });



app.get('/auth/refresh', async (req, res) => {
  const refresh_token = req.query.refresh_token;
  try {
    console.log('Refreshing access token...');
    const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }), {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${spotify_client_id}:${spotify_client_secret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const {access_token } = response.data;
    console.log('Access token refreshed:', access_token);
    res.json({ access_token });
  } catch (error) {
    console.log('Error refreshing access token:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

app.post('/auth/token', async(error, response, body) => { 
  console.log('Received response from /auth/token endpoint:', error, response, body);
}, (req, res) => {
  if(!error && response.statusCode === 200) {
    const { access_token, refresh_token } = response.body;
    console.log('Access token and refresh token received from /auth/token endpoint:', access_token, refresh_token);
    res.send({ access_token, refresh_token });
  }
});

app.get('/auth/token', async (req, res) => {
  const access_token = req.query.access_token;
  const refresh_token = req.query.refresh_token;  
  res.json({ access_token, refresh_token });
  if (!access_token || !refresh_token) {
    console.log('Missing required parameters');
    return res.status(400).json({ error: 'Missing required parameters' });  
  }
});
  




app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

