// reducers/playerReducer.js
const initialState = {
    currentTrack: null,
    isPlaying: false,
    volume: 0.7,
    repeat: false,
    shuffle: false,
    error: null,
  };
  
  const playerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PLAY_TRACK':
        return {
          ...state,
          currentTrack: action.payload.track,
          isPlaying: true,
        };
      case 'PAUSE_TRACK':
        return {
          ...state,
          isPlaying: false,
        };
      case 'SET_VOLUME':
        return {
          ...state,
          volume: action.payload,
        };
      case 'TOGGLE_REPEAT':
        return {
          ...state,
          repeat: !state.repeat,
        };
      case 'TOGGLE_SHUFFLE':
        return {
          ...state,
          shuffle: !state.shuffle,
        };
      case 'PLAYBACK_ERROR':
        return {
          ...state,
          error: action.payload.error,
        };
        case 'SET_PLAYBACK_STATE':
          return {
            ...state,
            isPlaying: action.payload.isPlaying,
            currentTrack:action.payload.currentTrack,
          };
          
      default:
        return state;
    }
  };
  
  export default playerReducer;
  