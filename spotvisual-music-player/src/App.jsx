// src/App.jsx
import React, { useEffect, useState } from 'react';
import Login from './components/login/Login.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import Search from './components/dashboard/search/Search.jsx';

const token = new URLSearchParams(window.location.search).get('token');
const CLIENT_ID = '1f42356ed83f46cc9ffd35c525fc8541';
const REDIRECT_URI = 'http://localhost:3000/callback';
const CLIENT_SECRET = '487ec052888b4917b00665fc65b8df9f';
function App() {
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    var authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParams)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
      .catch(error => {
        console.log(error)
        alert(error)
      })
  },[])

  return (
    <div className="App">
      {accessToken === '' ? <Login /> : <Dashboard  token={accessToken} />}
    </div>
  );  
}

export default App;
