// AuthContext.jsx
import React, { createContext, useContext, useReducer ,useState, useEffect} from 'react';
import { getToken } from '../spotifyAuth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    access_token: null,
    expires:  null,
  })

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      getToken(code).then(data => {
        if (data.access_token) {
          setAuth({
            access_token: data.access_token,
            expires: new Date(Date.now() + data.expires_in * 1000),
          });
        }
      });
    }
  }, []);


  return (
    <AuthContext.Provider value={auth}>

      {children}

    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
// const initialState = {
//   access_token: null,
//   refresh_token: null,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_TOKEN':
//       return {
//         ...state,
//         access_token: action.payload.access_token,
//         refresh_token: action.payload.refresh_token,
//       };
//     case 'CLEAR_TOKEN':
//       return initialState;
//     default:
//       return state;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
