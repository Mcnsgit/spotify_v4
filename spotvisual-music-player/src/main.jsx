import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import GlobalStyles from "./styles/globalStyles.styles"
import store from "./redux/store/store.js";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import SongControls from './components/playerControls/songControls';
import {Player} from './components/player/Player.jsx';
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk';

const getOAuthToken = callback => {
    const accessToken = localStorage.getItem('spotify_access_token');
    callback(accessToken);
  };
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <WebPlaybackSDK
    initialDeviceName="Spotify Player"
    getOAuthToken={getOAuthToken}
    connectOnInitialized={true}
    initialVolume={0.5}
  >
    <ErrorBoundary>
      <div className="app">

        <GlobalStyles
          styles={{
            body: {
              backgroundColor: "#121212",
            },
            html: {
              backgroundColor: "#121212",
            },  
          }}
        />
        <App >
          <SongControls />
          <Player />
        </App>
      </div>
        
    </ErrorBoundary>
  </WebPlaybackSDK>
</Provider>
);

