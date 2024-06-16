// // App.jsx
// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dashboard from './components/dashboard/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/mainComponents/login/Login';
import { setToken as setReduxToken } from './redux/reducers/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('http://localhost:3001/token');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setToken(data.access_token);
        dispatch(setReduxToken(data.access_token));
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
// import React, { useEffect, useState } from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Dashboard from './components/dashboard/Dashboard';
// import ErrorBoundary from './components/ErrorBoundary';
// import Login from './components/login/Login';
// import { setToken } from './redux/reducers/authSlice';

// const App = () => {
//   const dispatch = useDispatch();
//   const [token, setToken] = useState(null);


//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/redirect');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();  // Ensure the response is parsed as JSON
//         setToken(data.access_token);
//       } catch (error) {
//         console.error('Error fetching token:', error);
//       }
//     };

//     fetchToken();
//   }, []);

//   return (

//       <ErrorBoundary>
//         <div>
//         {token ? <Dashboard token={token} /> : <Login />}
//         </div>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard /> } />
//           <Route path="*" element={<Navigate to={'/dashboard'} />} />
//         </Routes>

//       </ErrorBoundary>

//   );
// };

// export default App;

  