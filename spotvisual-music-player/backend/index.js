import express from 'express';
import cors from 'cors';
import lyricsFinder from 'lyrics-finder';
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

app.post('/auth/login', async (fetch, res) => {
  const { code } = fetch.body;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '1f42356ed83f46cc9ffd35c525fc8541',
    clientSecret: '487ec052888b4917b00665fc65b8df9f'
  });

  try {
    const {
      body: { access_token, refresh_token, expires_in },
    } = await spotifyApi.authorizationCodeGrant(code);

    res.json({ access_token, refresh_token, expires_in });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '1f42356ed83f46cc9ffd35c525fc8541',
    clientSecret: '487ec052888b4917b00665fc65b8df9f',
    refreshToken,
  });

  try {
    const {
      body: { access_token, expires_in },
    } = await spotifyApi.refreshAccessToken();
    res.json({ access_token, expires_in });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.get('/auth/lyrics', async (req, res) => {
  const { artist, track } = req.query;
  const lyrics = (await lyricsFinder(artist, track)) || 'No Lyrics Found';
  res.json({ lyrics });
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('listening on port', PORT);
});