const initialState = {
    discover_weekly: null,
    followed_artists: null,
    saved_albums: null,
    top_artists: null,
    top_tracks: null,
    user: null,
    user_playlists: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
        };
      case 'SET_PLAYLISTS':
        return {
          ...state,
          user_playlists: action.payload,
        };
      case 'SET_TOP_ARTISTS':
        return {
          ...state,
          top_artists: action.payload,
        };
      case 'SET_TOP_TRACKS':
        return {
          ...state,
          top_tracks: action.payload,
        };
      case 'SET_DISCOVER_WEEKLY':
        return {
          ...state,
          discover_weekly: action.payload,
        };
      case 'SET_SAVED_ALBUMS':
        return {
          ...state,
          saved_albums: action.payload,
        };
      case 'SET_FOLLOWED_ARTISTS':
        return {
          ...state,
          followed_artists: action.payload,
        };
      case 'RESET_STATE':
        return initialState;
      default:
        return state;
    }
  };
  
  export { initialState, reducer };
  