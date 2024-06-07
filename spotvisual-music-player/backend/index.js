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

const spotify_client_id = process.env.CLIENT_ID;
const spotify_client_secret = process.env.CLIENT_SECRET;
const spotify_redirect_uri = 'http://localhost:3000/';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

// app.use(express.static(path.join(__dirname, '../dist'))); 


const generateRandomString = function (length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

///authorization code 
app.get('/auth/login', (req, res) => {
  const scope = 'streaming user-read-email user-read-private';
  const state = generateRandomString(16);
  const auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: 'http://localhost:3000',
    state: state,
  });

  res.redirect(`https://accounts.spotify.com/authorize/?${auth_query_parameters.toString()}`);
});


// authrorization code exchange for access token
app.post('/callback', async (req, res) => {
  const code  = req.query.code;
  const state = req.query.state;
  if (!state || !code) {
    return res.status(400).json({ error: 'Bad Request' });
  }
  try {
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
        return res.json({ access_token, refresh_token });
      }catch(error ) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  });



app.get('/auth/refresh', async (req, res) => {
  const refresh_token = req.query.refresh_token;
  try {
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
    res.json({ access_token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

app.post('/auth/token', async(error, response, body) => { }, (req, res) => {
  if(!error && response.statusCode === 200) {
    const { access_token, refresh_token } = response.body;
    res.send({ access_token, refresh_token });
  }
});

app.get('/auth/token', async (req, res) => {
  const access_token = req.query.access_token;
  const refresh_token = req.query.refresh_token;  
  if (!access_token || !refresh_token) {
    return res.status(400).json({ error: 'Missing required parameters' });  
  }
});
  




app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
