import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer.js';
import userReducer from './userReducer';
import playlistReducer from './playlistReducer';
import browseReducer from './browseReducer';

import uiReducer from './uiReducer';
import {playbackReducer} from './playbackReducer';
import visualizerReducer from './visualizerReducer';
import artistReducer from './artistsReducer.js';
import albumReducer from './albumsReducer.js';
import playerReducer from './playerReducer';
import searchReducer from './searchReducer.js';
import authSlice from './authSlice.js';



const rootReducer = combineReducers({
  auth: authSlice,
  playback: playbackReducer,
  visualizer: visualizerReducer,
  session: sessionReducer,
  token: sessionReducer,
  deviceId: sessionReducer,
  user: userReducer,
  playlist: playlistReducer,
  browse: browseReducer,
  ui: uiReducer,
  artist: artistReducer,
  album: albumReducer,
  player: playerReducer,
  search: searchReducer,
});

export default rootReducer;