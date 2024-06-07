const initialState = {
  playlistMenu: [],
  playlists: [],
  fetchPlaylistPending: false,
  fetchPlaylistError: false,
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PLAYLIST_MENU_PENDING':
      return {
        ...state,
        fetchPlaylistPending: true,
      };
    case 'FETCH_PLAYLIST_MENU_SUCCESS':
      return {
        ...state,
        playlistMenu: action.payload,
        playlists: action.payload,
        fetchPlaylistError: false,
        fetchPlaylistPending: false,
      };
    case 'ADD_PLAYLIST_ITEM':
      return {
        ...state,
        playlists: [
          ...state.playlists,
          action.payload,
        ],
      };
    case 'FETCH_PLAYLIST_MENU_ERROR':
      return {
        ...state,
        fetchPlaylistError: true,
        fetchPlaylistPending: false,
      };
    default:
      return state;
  }
};

export default playlistReducer;
