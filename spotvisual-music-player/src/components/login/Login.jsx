// src/components/Login.jsx
import React from 'react';
import './Login.css';

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/login';
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Log in with Spotify</button>
    </div>
  );
};

export default Login;

                  // src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
                  // alt="spotify logo"
                  // />

  




// export default function Login() {
//   return (
//     <Container
//       className="d-flex justify-content-center align-items-center"
//       style={{ minHeight: "100vh" }}
//     >
//       <a className="btn btn-success btn-lg" href={AUTH_URL}>
//         Login With Spotify
//       </a>
//     </Container>
//   )
// }
// const clientId = '1f42356ed83f46cc9ffd35c525fc8541';
// const redirectUrl = "http://localhost:3001";
// const apiUrl = "https://accounts.spotify.com/authorize";
// const scope = [
//   "user-read-email",
//   "user-read-private",
//   "user-modify-playback-state",
//   "user-read-playback-state",
//   "user-read-currently-playing",
//   "user-read-recently-played",
//   "user-read-playback-position",
//   "user-top-read",
//   "playlist-read-private",
//   window.location.href =${apiUrl}? + 'client_id=1f42356ed83f46cc9ffd35c525fc8541&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing
// };
// return (
// ];