import { createSlice } from '@reduxjs/toolkit';

const albumSlice = createSlice({
  name: 'album',
  initialState: {
    currentAlbum: null,
    fetchAlbumPending: false,
    fetchAlbumError: false
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

    setFetchAlbumError: (state, action) => {
      state.fetchAlbumError = action.payload;
    },  
  },
  extraReducers: {
    [setAlbumPending]: (state, action) => {
      state.fetchAlbumPending = action.payload;
    },
    [setAlbumError]: (state, action) => {
      state.fetchAlbumError = action.payload;
    },  

    [setAlbumSuccess]: (state, action) => {
      state.currentAlbum = action.payload;
    },
  } 
});

export const {
  clearAlbum,
  setAlbum,
  setFetchAlbumPending,
  setFetchAlbumError,
  setFetchAlbumSuccess,
} = albumSlice.actions;
export default albumSlice.reducer;

//   switch (action.type) {

//   case "FETCH_ALBUM_PENDING":
//     return {
//       ...state,
//       fetchAlbumPending: true
//     };

//   case "FETCH_ALBUM_SUCCESS":
//     return {
//       ...state,
//       currentAlbum: action.album,
//       fetchAlbumError: false,
//       fetchAlbumPending: false
//     };

//   case "FETCH_ALBUM_ERROR":
// //     return {
// export const albumReducer = (state = {}, action) => {
//   switch (action.type) {
//     case 'FETCH_ALBUM_SUCCESS':
//       return {
//         ...state,
//         currentAlbum: action.album,
//         fetchAlbumError: false,
//         fetchAlbumPending: false
//       };
//     case 'FETCH_ALBUM_PENDING':
//       return {
//         ...state,
//         fetchAlbumPending: true
//       };

//     case 'FETCH_ALBUM_ERROR':
//       return {
//         ...state,
//         fetchAlbumError: true
//       };

//     default:
//       return state;
//   }
// };

// export default albumReducer;