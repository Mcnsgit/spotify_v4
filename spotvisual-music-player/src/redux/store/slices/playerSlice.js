import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  isPlaying: false,
  volume: 0.5,
  repeat: false,
  shuffle: false,
  visualizer: false,
  // other state
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
    },
    toggleIsPlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    toggleRepeat(state) {
      state.repeat = !state.repeat;
    },
    toggleShuffle(state) {
      state.shuffle = !state.shuffle;
    },
    toggleVisualizer(state) {
      state.visualizer = !state.visualizer;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
  },
});

export const { setCurrentSong, toggleIsPlaying, toggleRepeat, toggleShuffle, toggleVisualizer, setVolume } = playerSlice.actions;
export default playerSlice.reducer;