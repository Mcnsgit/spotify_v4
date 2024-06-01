import React from "react"
import { Container } from "react-bootstrap"
import { LoginButton, LoginLink } from "../styles/Login.styles.jsx"


export default function Login() {
  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=1f42356ed83f46cc9ffd35c525fc8541&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
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