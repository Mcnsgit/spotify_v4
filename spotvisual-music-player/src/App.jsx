// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SideMenu from "./components/dashboard/SideMenu/SideMenu";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Login from "./components/login/Login";
// import Dashboard from "./components/dashboard/Dashboard";
// import SpotifyPlayer from 'react-spotify-web-playback-sdk';

// import {Player} from "./components/player/Player";

// export default function App() {
//   const code = new URLSearchParams(window.location.search).get("code"); 

//   return (
//     <Router>
//       <div className="app">
//           <SideMenu />
//           <Routes>
//             <Route path="/" element={code ? <Dashboard code={code} /> : <Login />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/player" element={<Player />} />
//           </Routes>
//       </div>
//     </Router>
//   );
// }

import React, { useState, useEffect } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import AuthContextProvider  from './utils/contexts/AuthContext.jsx';
import PlaybackContextProvider from './utils/contexts/PlaybackContext.jsx';
import ViewportContextProvider from './utils/contexts/ViewportContext.jsx';
const  App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);

  return (
    <AuthContextProvider> 
      <PlaybackContextProvider>
        <ViewportContextProvider>
        <Dashboard token={token} />
        </ViewportContextProvider>
      </PlaybackContextProvider>
    </AuthContextProvider>

  );
}

export default App;
