// import express from 'express';
// import pkg from 'request';
// import { randomBytes } from 'crypto';
// import cors from 'cors';
// import { stringify } from 'querystring';
// import cookieParser from 'cookie-parser';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const {post, get} = pkg;

// const client_id = '1f42356ed83f46cc9ffd35c525fc8541'; // your clientId
// const client_secret = '487ec052888b4917b00665fc65b8df9f'; // Your secret
// const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

// const generateRandomString = (length) => {
//   return randomBytes(60)
//     .toString('hex')
//     .slice(0, length);
// }

// const stateKey = 'spotify_auth_state';

// const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, 'public')))
//   .use(cors())
//   .use(cookieParser());

// app.get('/login', function (req, res) {

//   const state = generateRandomString(16);
//   res.cookie(stateKey, state);

//   // your application requests authorization
//   const scope = 'user-read-private user-read-email';
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });

// app.get('/callback', function (req, res) {

//   // your application requests refresh and access tokens
//   // after checking the state parameter

//   const code = req.query.code || null;
//   const state = req.query.state || null;
//   const storedState = req.cookies ? req.cookies[stateKey] : null;

//   if (state === null || state !== storedState) {
//     res.redirect('/#' +
//       stringify({
//         error: 'state_mismatch'
//       }));
//   } else {
//     res.clearCookie(stateKey);
//     const authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };

//     post(authOptions, function (error, response, body) {
//       if (!error && response.statusCode === 200) {

//         const access_token = body.access_token,
//           refresh_token = body.refresh_token;

//         const options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };

//         // use the access token to access the Spotify Web API
//         get(options, function (error, response, body) {
//           console.log(body);
//         });

//         // we can also pass the token to the browser to make requests from there
//         res.redirect('/#' +
//           stringify({
//             access_token: access_token,
//             refresh_token: refresh_token
//           }));
//       } else {
//         res.redirect('/#' +
//           stringify({
//             error: 'invalid_token'
//           }));
//       }
//     });
//   }
// });

// app.get('/refresh_token', function (req, res) {

//   const refresh_token = req.query.refresh_token;
//   const authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//     },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   post(authOptions, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       const access_token = body.access_token;
//       res.send({
//         'access_token': access_token,
//         'refresh_token': body.refresh_token
//       });
//     }
//   });
// });

// console.log('Listening on 8080');
// app.listen(8080);