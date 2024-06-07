const initialState = {
  currentArtist: null,
  fetchArtistPending: false,
  fetchArtistError: false,
};

const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ARTIST_PENDING':
      return {
        ...state,
        fetchArtistPending: true,
      };
    case 'FETCH_ARTIST_SUCCESS':
      return {
        ...state,
        currentArtist: action.payload,
        fetchArtistError: false,
        fetchArtistPending: false,
      };
    case 'FETCH_ARTIST_ERROR':
      return {
        ...state,
        fetchArtistError: true,
        fetchArtistPending: false,
      };
    case 'FETCH_ALBUMS_SUCCESS':
      return {
        ...state,
        currentArtist: {
          ...state.currentArtist,
          albums: action.payload,
        },
      };
    case 'FETCH_POPULAR_SUCCESS':
      return {
        ...state,
        currentArtist: {
          ...state.currentArtist,
          popular: action.payload,
        },
      };
    case 'FOLLOW_ARTIST':
      return {
        ...state,
        currentArtist: {
          ...state.currentArtist,
          follows: true,
        },
      };
    case 'UNFOLLOW_ARTIST':
      return {
        ...state,
        currentArtist: {
          ...state.currentArtist,
          follows: false,
        },
      };
    default:
      return state;
  }
};

export default artistsReducer;
