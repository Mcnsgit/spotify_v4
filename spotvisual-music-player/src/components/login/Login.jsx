// // import { useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { getToken } from '../../utils/index.jsx'
// // // Login.jsx
// import React from 'react';
// import { Container } from 'react-bootstrap';
// import './Login.css';
// import Button from '../reusableComponents/Button/Button.jsx';

// // const authEndpoint = "https://accounts.spotify.com/authorize?";
// const clientId = "1f42356ed83f46cc9ffd35c525fc8541";
// const redirectUrl = "http://localhost:3000";
// const scope = ["user-library-read", "playlist-read-private"];

// const handleLogin = () => {
//   		window.location.href = 'http://localhost:3001/auth/login';
//   	};
import React, { useEffect } from 'react';
import { redirectToSpotifyAuthorize } from '../../utils/spotifyAuth';
import { useAuth } from '../../utils/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.access_token) {
      navigate('/dashboard');
    }
  }, [auth, navigate]);

  return (
    <div>
      <button onClick={redirectToSpotifyAuthorize}>Login with Spotify</button>
    </div>
  );
};

export default Login;


// // const Login = () => {
// // 	const handleLogin = () => {
// // 		window.location.href = 'http://localhost:3001/auth/login';
// // 	};
	
// // 	return (
// // 		<MainView id="login" pageTitle="Log in">
// // 		    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}  >
// //     			<img className="logo" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="spotify logo"   />
// // 				<h2>Log in with Spotify</h2>
// // 				<Button color="primary" label="Log in with Spotify" onClick={handleLogin}>Login </Button>
// // 				<small>Need an account? <a href="https://www.spotify.com/se/signup/">Sign up for free to start listening</a></small>
// // 		    </Container>
// // 		</MainView>
// // 	);
// // 	}
	
// 	// export default Login;
