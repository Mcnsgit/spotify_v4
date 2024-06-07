const initialState = {
  token: null,
  deviceId: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SET_DEVICE_ID':
      return {
        ...state,
        deviceId: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
