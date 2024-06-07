const initialState = {
  artists: [],
  playlists: [],
  tracks: [],
  albums: [],
  fetchDataPending: false,
  query: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        artists: action.payload.artists.items,
        playlists: action.payload.playlists.items,
        tracks: action.payload.tracks.items,
        albums: action.payload.albums.items,
        fetchDataPending: false,
      };
    case 'FETCH_DATA_PENDING':
      return {
        ...state,
        fetchDataPending: true,
      };
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
