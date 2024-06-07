import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/index.jsx'
import { Container } from "react-bootstrap"
import Button from '../reusableComponents/Button.jsx'
import MainView from '../layoutComponents/views/MainView.jsx'

const Login = () => {
	const handleLogin = () => {
		const clientId = '1f42356ed83f46cc9ffd35c525fc8541';
		const redirectUrl = "http://localhost:3001";
		const apiUrl = "https://accounts.spotify.com/authorize";
		const scope = [
			"user-read-email",
			"user-read-private",
			"user-modify-playback-state",
	  "user-read-playback-state",
	  "user-read-currently-playing",
	  "user-read-recently-played",
	  "user-read-playback-position",
	  "user-top-read",
	  "playlist-read-private",
		].join(' ');
		const url = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=code`;
		};
	//   window.location.href =${apiUrl}? + 'client_id=1f42356ed83f46cc9ffd35c525fc8541&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing
	
	// const navigate = useNavigate();

	// const handleAuth = () => {
	// 	const code = window.location.search.split('=')[1];
	// 	const clientId = '1f42356ed83f46cc9ffd35c525fc8541';
	// 	const redirectUrl = 'http://localhost:3001';
	// 	const apiUrl = 'https://accounts.spotify.com/api/token';
	// 	const scope = [
	// 		'user-read-email',
	// 		'user-read-private',
	// 		'user-library-read',
	// 		'user-library-modify',
	// 		'user-read-playback-state',
	// 		'user-read-recently-played',
	// 		'user-top-read',
	// 		'playlist-read-private',
	// 		'user-modify-playback-state',
	// 		'user-read-currently-playing',
	// 		'user-read-playback-position',
	// 	].join(' ');
	// 	const url = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=code&code=${code}`;

	// useEffect(() => {
	// 	// check for access token and refresh token in local storage
	// 	const token = getToken();

	// 	if (!token) {
	// 		return;
	// 	}

	// 	// navigate to redirect
	// 	const queryParams = new URLSearchParams(token).toString()
	// 	navigate(`/redirect?${queryParams}`);

	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	return (
		<MainView id="login" pageTitle="Log in">

    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}  >
    <img className="logo" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="spotify logo"   />


    </Container>
			<Button color="primary" label="Log in with Spotify" onClick={process.env.REACT_APP_BACKEND_URI + 'login'} />
			<a className="btn" href={process.env.REACT_APP_BACKEND_URI + 'login'}>Log in</a>
			<small>Need an account? <a href="https://www.spotify.com/se/signup/">Sign up for free to start listening</a></small>
		</MainView>
	);
}

export default Login;
//     <>
//     <LoginButton>
//       <LoginLink onClick={AUTH_URL}>LOGIN WITH SPOTIFY</LoginLink>
//     </LoginButton>

//     </>
//   )
// }

// export default Login
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