import { createSlice } from '@reduxjs/toolkit';

const albumSlice = createSlice({
  name: 'album',
  initialState: {
    currentAlbum: null,
    fetchAlbumPending: false,
    fetchAlbumError: false,
  },
  reducers: {
    clearAlbum: (state) => {
      state.currentAlbum = null;
    },
    setAlbum: (state, action) => {
      state.currentAlbum = action.payload;
    },
    setFetchAlbumPending: (state, action) => {
      state.fetchAlbumPending = action.payload;
    },
    setFetchAlbumSuccess: (state, action) => {
      state.currentAlbum = action.payload;
      state.fetchAlbumPending = false;
      state.fetchAlbumError = false;
    },
    setFetchAlbumError: (state, action) => {
      state.fetchAlbumError = action.payload;
      state.fetchAlbumPending = false;
    },
  },
});

export const {
  clearAlbum,
  setAlbum,
  setFetchAlbumPending,
  setFetchAlbumError,
  setFetchAlbumSuccess,
} = albumSlice.actions;

export default albumSlice.reducer;
