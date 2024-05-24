 // actions/playerActions.js
 export const playTrack = (track) => ({
    type: 'PLAY_TRACK',
    payload: { track },
  });
  
  export const pauseTrack = () => ({
    type: 'PAUSE_TRACK',
  });
  
  export const setVolume = (volume) => ({
    type: 'SET_VOLUME',
    payload: { volume },
  });
  
  export const toggleRepeat = () => ({
    type: 'TOGGLE_REPEAT',
  });
  
  export const toggleShuffle = () => ({
    type: 'TOGGLE_SHUFFLE',
  });
  
  export const playbackError = (error) => ({
    type: 'PLAYBACK_ERROR',
    payload: { error },
  });