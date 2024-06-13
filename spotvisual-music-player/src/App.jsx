// App.jsx
// src/App.jsx
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './components/dashboard/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/login/Login';
import { setToken } from './redux/reducers/authSlice';
// import SpotifyPlaybackProvider from './utils/SpotifyPlaybackProvider';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const access_token = useSelector((state) => state.auth.access_token);

  useEffect(() => {
    // Extract token from URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      // Save the token and redirect to dashboard
      dispatch(setToken({ access_token: token, expires_at: Date.now() + 3600 * 1000 }));
      navigate('/dashboard', { replace: true });
    } else {
      // If no token, check if already authenticated
      fetch('/token')
        .then(response => response.json())
        .then(data => {
          if (data.access_token) {
            dispatch(setToken({ access_token: data.access_token, expires_at: Date.now() + 3600 * 1000 }));
            navigate('/dashboard', { replace: true });
          }
        });
    }
  }, [dispatch, navigate]);

  return (

      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard /> } />
          <Route path="*" element={<Navigate to={'/dashboard'} />} />
        </Routes>
      </ErrorBoundary>

  );
};

export default App;

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const access_token = useSelector((state) => state.auth.access_token);
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const response = await fetch('/token');
  //     const data = await response.json();
  //     if (data.access_token) {
  //       setToken(data.access_token);
  //       dispatch(setToken({ access_token: data.access_token, expires_at: Date.now() + 3600 * 1000 }));
  //       navigate('/dashboard');
  //     }
  //   };

  //   fetchToken();
  // }, [dispatch, navigate]);

//   return (
//     <WebPlayback token={token}>
//       <ErrorBoundary>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
//           <Route path="*" element={<Navigate to={access_token ? '/dashboard' : '/login'} />} />
//         </Routes>
//       </ErrorBoundary>
//       </WebPlayback>
//   );
// };
