import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer.js';
import playerReducer from '../reducers/playerReducer.js';
import visualizerReducer from '../reducers/visualizerReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
  visualizer: visualizerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});
export default store;