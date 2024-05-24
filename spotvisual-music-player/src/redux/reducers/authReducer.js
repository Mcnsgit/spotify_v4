
// reducers/authReducer.js
const initialState = {
  isAuthenticated: false,
  accessToken: null,
  refresh_token: null,
  expiresIn: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        refresh_token: action.payload.refresh_token,
        expiresIn: action.payload.expiresIn,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        refresh_token: null,
        expiresIn: null,
        error: action.payload.error,
      };
    case 'LOGOUT':
      return initialState;
    case 'REFRESH_TOKEN_SUCCESS':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        expiresIn: action.payload.expiresIn,
      };
    case 'REFRESH_TOKEN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        refresh_token: null,
        expiresIn: null,
        error: action.payload.error,
      };
      case 'SET_TOKEN':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        expiresIn: action.payload.expiresIn,
      };
    default:
      return state;
  }
};

export default authReducer;
