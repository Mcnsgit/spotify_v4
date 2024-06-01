import React from "react"
import { Container } from "react-bootstrap"
import { LoginButton, LoginLink } from "../../styles/Login.styles.jsx"


const Login = () => {
    const AUTH_URL ='https://accounts.spotify.com/authorize?client_id=1f42356ed83f46cc9ffd35c525fc8541&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'
  return (
    <>
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}  >
    <img className="logo" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="spotify logo"   />


    </Container>
    <LoginButton>
      <LoginLink href={AUTH_URL}>LOGIN WITH SPOTIFY</LoginLink>
    </LoginButton>

    </>
  )
}

export default Login
// // src/components/Login.jsx
// import React from 'react';
// import './Login.css';
// import axios from 'axios';

// const Login = () => {

//   const handleAuth = () => {
//     const code = window.location.search.split('=')[1];
//     const clientId = '1f42356ed83f46cc9ffd35c525fc8541';
//     const redirectUrl = 'http://localhost:3001';
//     const apiUrl = 'https://accounts.spotify.com/api/token';
//     const scope = [
//       'user-read-email',
//       'user-read-private',
//       'user-library-read',
//       'user-library-modify',
//       'user-read-playback-state',
//       'user-modify-playback-state',
//     ].join(' ');
//     const url = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=code&code=${code}`;
//     axios
//       .post(url)
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     window.location.href = 'http://localhost:3001/auth/login';
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <button onClick={handleLogin}>Log in with Spotify</button>
//     </div>
//   );
// };

// export default Login;

//                   // src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
//                   // alt="spotify logo"
//                   // />

  




// // export default function Login() {
// //   return (
// //     <Container
// //       className="d-flex justify-content-center align-items-center"
// //       style={{ minHeight: "100vh" }}
// //     >
// //       <a className="btn btn-success btn-lg" href={AUTH_URL}>
// //         Login With Spotify
// //       </a>
// //     </Container>
// //   )
// // }
// // const clientId = '1f42356ed83f46cc9ffd35c525fc8541';
// // const redirectUrl = "http://localhost:3001";
// // const apiUrl = "https://accounts.spotify.com/authorize";
// // const scope = [
// //   "user-read-email",
// //   "user-read-private",
// //   "user-modify-playback-state",
// //   "user-read-playback-state",
// //   "user-read-currently-playing",
// //   "user-read-recently-played",
// //   "user-read-playback-position",
// //   "user-top-read",
// //   "playlist-read-private",
// //   window.location.href =${apiUrl}? + 'client_id=1f42356ed83f46cc9ffd35c525fc8541&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing
// // };
// // return (
// // ];