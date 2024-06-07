import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.5,
  repeat: false,
  shuffle: false,
  visualizer: false,
  };
  
  const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
      setCurrentTrack: (state, action) => {
        state.currentTrack = action.payload;
      },
      toggleIsPlaying: (state) => {
        state.isPlaying = !state.isPlaying;
      },
      toggleRepeat: (state) => {
        state.repeat = !state.repeat;
      },
      toggleShuffle: (state) => {
        state.shuffle = !state.shuffle;
      },
      toggleVisualizer: (state) => {
        state.visualizer = !state.visualizer;
      },
      setVolume: (state, action) => {
        state.volume = action.payload;
      },
  },
});
export const {
  setCurrentTrack,
  toggleIsPlaying,
  toggleRepeat,
  toggleShuffle,
  toggleVisualizer,
  setVolume,
} = playerSlice.actions;
export default playerSlice.reducer;


  //   switch (action.type) {
  //     case 'PLAY_TRACK':
  //       return {
  //         ...state,
  //         currentTrack: action.payload.track,
  //         isPlaying: true,
  //       };
  //     case 'PAUSE_TRACK':
  //       return {
  //         ...state,
  //         isPlaying: false,
  //       };
  //     case 'SET_VOLUME':
  //       return {
  //         ...state,
  //         volume: action.payload,
  //       };
  //     case 'TOGGLE_REPEAT':
  //       return {
  //         ...state,
  //         repeat: !state.repeat,
  //       };
  //     case 'TOGGLE_SHUFFLE':
  //       return {
  //         ...state,
  //         shuffle: !state.shuffle,
  //       };
  //     case 'PLAYBACK_ERROR':
  //       return {
  //         ...state,
  //         error: action.payload.error,
  //       };
  //       case 'SET_PLAYBACK_STATE':
  //         return {
  //           ...state,
  //           isPlaying: action.payload.isPlaying,
  //           currentTrack:action.payload.currentTrack,
  //         };
          
  //     default:
  //       return state;
  //   }
  // };
  
  // export default playerReducer;
  