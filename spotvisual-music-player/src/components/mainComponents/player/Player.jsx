import React, { useEffect, useState, useCallback } from 'react';
import { WebPlaybackSDK, usePlaybackState, usePlayerDevice } from 'react-spotify-web-playback-sdk';

const SpotifyPlayerComponent = ({ accessToken }) => {
  const getOAuthToken = useCallback(callback => callback(accessToken), [accessToken]);

  return (
    <WebPlaybackSDK
      deviceName="Spotify Web Player"
      getOAuthToken={getOAuthToken}
      volume={0.5}
    >
      <Player />
    </WebPlaybackSDK>
  );
};

const Player = () => {
  const playbackState = usePlaybackState();
  const playerDevice = usePlayerDevice();

  useEffect(() => {
    if (playerDevice) {
      console.log('Player Device ID:', playerDevice.device_id);
    }
  }, [playerDevice]);

  useEffect(() => {
    if (playbackState) {
      console.log('Currently Playing:', playbackState.track_window.current_track);
    }
  }, [playbackState]);

  return (
    <div>
      <h2>Spotify Web Player</h2>
      {playbackState ? (
        <div>
          <p>Track: {playbackState.track_window.current_track.name}</p>
          <p>Artist: {playbackState.track_window.current_track.artists[0].name}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SpotifyPlayerComponent;
// import React, { useEffect } from 'react';




// const App = () => {
//   const token = 'BQAZ4zvIpd7XjiInqL8pjSHfLb-WUAJDlTQOguItU_NPPgk9HEW1zOn95w1efEq6Vy3F9MWv3t4yfZNsd2YgnCUxr_t7caYDC5qF3XyhLzN4ytiLoG_sUTsY6aR6ee7ZzdIm-KOJMAk3NLuB-lIHUkyQGaazwdj1khQbE-00qJrORsfDrpAdQv9y8mO8xSy_XpYfSQGmUnQ  ';
//   const player = new Spotify.Player({
//     name: 'Web Playback SDK Quick Start Player',
//     getOAuthToken: cb => { cb(token); },
//     volume: 0.5 // initial volume, 0.0 to 1.0
//   });



//   useEffect(() => {
//     player.addListener('ready', ({ device_id }) => {
//       console.log('Ready with Device ID', device_id);
//     });

//     player.addListener('not_ready', ({ device_id }) => {
//       console.log('Device ID has gone offline', device_id);
//     });

//     player.addListener('initialization_error', ({ message }) => {
//       console.error(message);
//     });

//     player.addListener('authentication_error', ({ message }) => {
//       console.error(message);
//     });

//     player.addListener('account_error', ({ message }) => {
//       console.error(message);
//     });

//     document.getElementById('togglePlay').onclick = function() {
//       player.togglePlay();
//     };

//     player.connect();
//   }, []);

//   return (
//     <div>
//       <h1>Spotify Web Playback SDK Quick Start</h1>
//       <button id="togglePlay">Toggle Play</button>
//     </div>
//   );
// }

// export default App;