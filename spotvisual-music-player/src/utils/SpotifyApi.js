import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import axios from "axios";
import querystring from "querystring";
import { getAccessToken } from "../components/dashboard/NowPlaying";
// import SpotifyWebApi from "spotify-web-api-node"; 


const PLAYER_ENDPOINT = 'https://api.spotify.com/v1/me/player/'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const client_id = '1f42356ed83f46cc9ffd35c525fc8541';
const client_secret = '487ec052888b4917b00665fc65b8df9f';
const refresh_token = 'AQDORkPSf8As_vWHcu8myV9HemOVRbRu4mWW_zpeiqLuKYcKjjIeH151B36q6GOU0opcKeWOobY1K9SKWQ7vWGd-5om78uVxSlv479C4y_3sqXN05SJPND1eOkVEUEOuKgM'






export const setAccessToken = async (accessToken) => {
  localStorage.setItem('access_token', accessToken);
  spotifyApi.setAccessToken(accessToken);
}

export const getRefreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  const response = await axios.post('http://localhost:${PORT}/refresh_token?refresh_token=${refresh_token}');
  const data = await response.json();
  setAccessToken(data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
}
 
export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", client_id);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// export async function getAccessToken(clientId, code) {
//     const verifier = localStorage.getItem("verifier");

//     const params = new URLSearchParams();
//     params.append("client_id", clientId);
//     params.append("grant_type", "authorization_code");
//     params.append("code", code);
//     params.append("redirect_uri", "http://localhost:5173");
//     params.append("code_verifier", verifier);

//     const result = await fetch("https://accounts.spotify.com/api/token", {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: params
//     });

//     const { access_token } = await result.json();
//     return access_token;
// }
export const loginToSpotify = async () => {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await sha256(codeVerifier);
    localStorage.setItem('code_verifier', codeVerifier);

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: 'user-read-private user-read-email',
        redirect_uri: 'http://localhost:3000',
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
    });

    window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

  const handleLogout = () => {
    localStorage.removeItem('code_verifier');
    window.location = "http://localhost:3001/logout";
  }

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = Array.from(crypto.randomBytes(length));
    return values.map(x => possible[x % possible.length]).join('');
  };

  const sha256 = (plain) => {
    return crypto.createHash('sha256').update(plain).digest('base64url');
  };

export async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` } }); 
        if (result.status === 401)
            { throw new Error("Invalid token");
            } else if (result.status === 200)
                { const profile = await result.json();
                    return profile;
                } else {
                throw new Error("Failed to fetch profile"); }

    const profile = await fetchProfile(token);
    console.log(profile);
    return profile;
}

function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
}

// SpotifyApi.js



export const fetchAccessToken = async (code) => {
  try {
    const code_verifier= localStorage.getItem('code_verifier');
    const response = await axios.post('/callback', { code, code_verifier});
    return response.data.accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

export const getrefresh_token = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  const url = "https://accounts.spotify.com/api/token";

   const payload = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     body: new URLSearchParams({
       grant_type: 'refresh_token',
       refresh_token: refresh_token,
       client_id: clientId
     }),
   }
   const body = await fetch(url, payload);
   const response = await body.json();

   localStorage.setItem('access_token', response.accessToken);
   localStorage.setItem('refresh_token', response.refresh_token);
 }


  
export const searchSpotify = async (query, type) => {
  try {
    const response = await axios.get(`/search?q=${query}&type=${type}`);
    return response.data;
  } catch (error) {
    console.error('Error searching Spotify:', error);
    throw error;
  }
};

export const playTrack = async () => {
  try {
    await axios.put('/play');
  } catch (error) {
    console.error('Error playing track:', error);
    throw error;
  }
};

export const pauseTrack = async () => {
  try {
    await axios.put('/pause');
  } catch (error) {
    console.error('Error pausing track:', error);
    throw error;
  }
};

export const nextTrack = async () => {
  try {
    await axios.put('/next');
  } catch (error) {
    console.error('Error skipping to next track:', error);
    throw error;
  }
};

export const previousTrack = async () => {
  try {
    await axios.put('/previous');
  } catch (error) {
    console.error('Error skipping to previous track:', error);
    throw error;
  }
};

  export  const  useAuth = () => {
    let code = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('code');
  };
    const [accessToken, setAccessToken] = useState()
    const [refresh_token, setrefresh_token] = useState()
    const [expiresIn, setExpiresIn] = useState()
    const dispatch = useDispatch();
  
    useEffect(() => {
      const code = new URLSearchParams(window.location.search).get("code")
      if (!code) return;
  

      axios
        .post("http://localhost:3001/login", {
          code,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setrefresh_token(res.data.refresh_token)
          setExpiresIn(res.data.expiresIn);
          dispatch(loginSuccess(res.data.accessToken, res.data.refresh_token, res.data.expiresIn))
          window.history.pushState({}, null, "/dashboard");
        })
        .catch(error => {
          dispatch(loginFailure(error))
          window.location = "/login"
        })
    }, [code])
  
    useEffect(() => {
      if (!refresh_token || !expiresIn) return
      const interval = setInterval(() => {
        axios
          .post("http://localhost:3001/refresh", {
            refresh_token,
          })
          .then(res => {
            setAccessToken(res.data.accessToken)
            setExpiresIn(res.data.expiresIn)
            dispatch(refresh_tokenSuccess(res.data.accessToken, res.data.expiresIn))
          })
          .catch(error => {
            dispatch(refresh_tokenFailure(error));
            window.location = "/login"
          });
      }, (expiresIn - 60) * 1000)


      return () => clearInterval(interval)
    }, [refresh_token, expiresIn, dispatch]);
  
    return {accessToken, refresh_token, expiresIn};

  }
