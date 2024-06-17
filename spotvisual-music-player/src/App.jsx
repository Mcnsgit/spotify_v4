// // App.jsx
// src/App.jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import MainView from './views/MainView';
// import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/mainComponents/login/Login';
import { setToken } from './redux/reducers/authSlice';

window.onSpotifyWebPlaybackSDKReady = () => {};

class App extends Component {
  state = {
    playerLoaded: false,
  };

  componentDidMount() {
    const token = Login.getToken();
    if (!token) {
      Login.logInWithSpotify();
    } else {
      this.setState({ token: token });
      this.props.setToken(token);
      this.props.fetchUser();
    }
  }

  render() {
    let webPlaybackSdkProps = {
      playerName: 'Spotify React Player',
      playerInitialVolume: 1.0,
      playerRefreshRateMs: 1000,
      playerAutoConnect: true,
      onPlayerRequestAccessToken: () => this.state.token,
      onPlayerLoading: () => {},
      onPlayerWaitingForDevice: () => {
        this.setState({ playerLoaded: true });
      },
      onPlayerError: (e) => {
        console.log(e);
      },
      onPlayerDeviceSelected: () => {
        this.setState({ playerLoaded: true });
      },
    };

    return (
      <div className='app'>
        <WebPlaybackReact {...webPlaybackSdkProps}>
          <Spinner loading={!this.state.playerLoaded}>
            <MainView />
          </Spinner>
        </WebPlaybackReact>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.sessionReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setToken(token)),
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

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

  