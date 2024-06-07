import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./Player.css";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import Dashboard from "../dashboard/Dashboard";

const SPOTIFY_API_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_CLIENT_ID = "1f42356ed83f46cc9ffd35c525fc8541";
const SPOTIFY_CLIENT_SECRET = "487ec052888b4917b00665fc65b8df9f";
const SPOTIFY_REDIRECT_URI = "http://localhost:3000/callback";

const getOAuthToken = callback => {
  // Retrieve the access token from your backend or auth service
  const accessToken = localStorage.getItem('access_token');
  callback(accessToken);
};

// const getToken = async code => {
//   const params = new URLSearchParams({
//     grant_type: "authorization_code",
//     code,
//     redirect_uri: SPOTIFY_REDIRECT_URI,
//     client_id: SPOTIFY_CLIENT_ID,
//     client_secret: SPOTIFY_CLIENT_SECRET,
//   });

//   const response = await axios.post(SPOTIFY_API_TOKEN_URL, params, {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   });

//   return response.data;
// };
const Playback = () => {
  return (
    <WebPlaybackSDK
      initialDeviceName="Spotify Player"
      getOAuthToken={getOAuthToken}
      connectOnInitialized={true}
      initialVolume={0.5}
    >
      <Dashboard />
    </WebPlaybackSDK>
  );
};

export default Playback;
// const Player = ({ token }) => {
//   const getOAuthToken = useCallback(callback => callback(token.access_token), [token.access_token]);

//   return (
//     <WebPlayback
//       initialDeviceName="Spotify Player in React"
//       getOAuthToken={getOAuthToken}
//       connectOnInitialized={true}
//       initialVolume={0.5}
//     >
//       <div className="root">
//         <div className="header">
//           <PlayerHeader />
//         </div>
//         <main className="player">
//           <PlayerContent access_token={token.access_token} />
//         </main>
//       </div>
//     </WebPlayback>
//   );
// };


// const PlayerWrapper = () => {
//   const [token, setToken] = useState(null);
//   const query = new URLSearchParams(window.location.search);
//   const code = query.get("code");
//   const state = query.get("state");

//   useEffect(() => {
//     const stateFromCookies = document.cookie.split("; ").find(row => row.startsWith("state="))?.split("=")[1];

//     if (stateFromCookies && stateFromCookies === state && code) {
//       getToken(code).then(response => {
//         if (isTokenObject(response)) {
//           setToken(response);
//         } else {
//           window.location.href = "/";
//         }
//       });
//     } else {
//       window.location.href = "/";
//     }
//   }, [code, state]);

//   if (!token) return null;

//   return <Player token={token} />;
// };

// const isTokenObject = value => {
//   return (
//     value != undefined &&
//     typeof value.access_token === "string" &&
//     typeof value.token_type === "string" &&
//     typeof value.scope === "string" &&
//     typeof value.expires_in === "number" &&
//     typeof value.refresh_token === "string"
//   );
// };

// const PlayerHeader = () => {
//   return (
//     <div className="player-header">
//       <h1>Spotify Player</h1>
//     </div>
//   );
// };

// const PlayerContent = ({ access_token }) => {
//   // Placeholder component for the player content
//   return (
//     <div className="player-content">
//       <p>Player Content</p>
//     </div>
//   );
// };

// // const WebPlayback = ({ initialDeviceName, getOAuthToken, connectOnInitialized, initialVolume, children }) => {
// //   // Placeholder component for the Web Playback SDK
// //   useEffect(() => {
// //     const script = document.createElement("script");
// //     script.src = "https://sdk.scdn.co/spotify-player.js";
// //     script.async = true;
// //     document.body.appendChild(script);

// //     window.onSpotifyWebPlaybackSDKReady = () => {
// //       const token = getOAuthToken(cb => cb());
// //       const player = new window.Spotify.Player({
// //         name: initialDeviceName,
// //         getOAuthToken: cb => cb(token),
// //         volume: initialVolume,
// //       });

// //       player.addListener("ready", ({ device_id }) => {
// //         console.log("Ready with Device ID", device_id);
// //       });

// //       player.addListener("not_ready", ({ device_id }) => {
// //         console.log("Device ID has gone offline", device_id);
// //       });

// //       player.connect().then(success => {
// //         if (success) {
// //           console.log("The Web Playback SDK successfully connected to Spotify!");
// //         }
// //       });
// //     };
// //   }, [initialDeviceName, getOAuthToken, initialVolume]);

// //   return <div className="web-playback">{children}</div>;
// // };

// export default PlayerWrapper;