const initialState = {
	device_id: null,
	display_player: false,
	player: null,
	playback_state: {
	  context: null,
	  current_position: null,
	  is_playing: false,
	  current_track: null,
	  next_tracks: [],
	  prev_tracks: [],
	  shuffle_mode: false,
	  repeat_mode: false,
	},
  };
  
  const playbackReducer = (state = initialState, action) => {
	switch (action.type) {
	  case 'SET_PLAYER':
		return {
		  ...state,
		  player: action.payload,
		};
	  case 'SET_DEVICE_ID':
		return {
		  ...state,
		  device_id: action.payload,
		};
	  case 'SET_DISPLAY_PLAYER':
		return {
		  ...state,
		  display_player: action.payload,
		};
	  case 'SET_PLAYBACK_STATE':
		return {
		  ...state,
		  playback_state: {
			...state.playback_state,
			...action.payload,
		  },
		};
	  default:
		return state;
	}
  };
  
  export { playbackReducer, initialState };
  