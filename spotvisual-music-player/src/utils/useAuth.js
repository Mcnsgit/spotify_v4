import { useState, useEffect } from "react"
import axios from "axios"

const clientId = '1f42356ed83f46cc9ffd35c525fc8541';
const redirectUri = 'http://localhost:3000';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const responseType = 'code';
const scope = 'user-read-private user-read-email';
  export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { access_token, refresh_token, expires_in },
        } = await axios.post(`http://localhost:3001/auth/login`, {
          code,
        })
        setAccessToken(access_token)
        setRefreshToken(refresh_token)
        setExpiresIn(expires_in)
        window.history.pushState({}, null, "/")
      } catch {
        window.location = "/"
      }
    })()
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(async () => {
      try {
        const {
          data: { access_token, expires_in },
        } = await axios.post(`http://localhost:3001/auth/refresh`, {
          refreshToken,
        })
        setAccessToken(access_token)
        setExpiresIn(expires_in)
      } catch {
        window.location = "/"
      }
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}


//   document.location = authUrl.toString()
  
//   authUrl.search = new URLSearchParams(params).toString();
//   window.location.href = authUrl.toString();
// };


// const generateCodeVerifier = (length) => {
//   let text = '';
//   let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }


// if (!code)  {
//   RedirectToAuthCodeFlow(client_id);
// } else {
//   getAccessToken(client_id, code);

//   Profile = await fetchProfile(code);
//   populateUI(profile);
// }
// const codeVerifier  = generateRandomString(64);

// const sha256 = async (plain) => {
//   const encoder = new TextEncoder()
//   const data = encoder.encode(plain)
//   return window.crypto.subtle.digest('SHA-256', data)
// }
// async function generateCodeChallenge(codeVerifier) {
//   const data = new TextEncoder().encode(codeVerifier);
//   const digest = await window.crypto.subtle.digest('SHA-256', data);
//   return btoa(String.fromCharCode(...new Uint8Array(digest)))
//     .replace(/=/g, '')
//     .replace(/\+/g, '-')
//     .replace(/\//g, '_');
// }


//     export async function getAccessToken(client_id, code) {
//   const verifier = localStorage.getItem("verifier");

//   const params = new URLSearchParams({
//     client_id: client_id,
//     grant_type: "authorization_code",
//     code: code,
//     redirect_uri: 'http://localhost:3000/dashboard',
//     code_verifier: verifier

//   });

//   const result = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: params
//   });

//   const { access_token } = await result.json();
//   return access_token;
// }
// export async function fetchProfile(token) {
//   const response = await fetch("https://api.spotify.com/v1/me", {
//       method: "GET", headers: { Authorization: `Bearer ${token}` }
//   });

//   return await response.json();
// }

      





// const hashed = await sha256(codeVerifier)
// const codeChallenge = base64encode(hashed);
// const clientId = client_id;
// const redirectUri = "http://localhost:3000/dashboard"

// const authUrl = new URL("https://accounts.spotify.com/authorize")

// // generated in the previous step
// window.localStorage.setItem('code_verifier', codeVerifier);

// const urlparams =  {
//   response_type: 'code',
//   client_id: clientId,
//   scope,
//   code_challenge_method: 'S256',
//   code_challenge: codeChallenge,
//   redirect_uri: redirectUri,
// }

// authUrl.search = new URLSearchParams(urlparams).toString();
// window.location.href = authUrl.toString();

// const urlParams = new URLSearchParams(window.location.search);



// // copied from the previous step
// export default function useAuth(code) {
//   const [accessToken, setAccessToken] = useState();
//   const [refreshToken, setRefreshToken] = useState();
//   const [expiresIn, setExpiresIn] = useState();
  
//   useEffect(() => {
//     axios
//     .post("http://localhost:3001/auth/login", { code })
//     .then(res => {
//       setAccessToken(res.data.accessToken);
//       setRefreshToken(res.data.refreshToken);
//       setExpiresIn(res.data.expiresIn);
//       window.history.pushState({}, null, "/dashboard");
//     })
//     .catch(() => {
//       window.location = "/";
//     });
//   }, [code]);
  
//   useEffect(() => {
//     if (!refreshToken || !expiresIn) return;
//     const interval = setInterval(() => {
//       axios
//       .post("http://localhost:3001/refresh", { refreshToken })
//       .then(res => {z
//         setAccessToken(res.data.accessToken);
//         setExpiresIn(res.data.expiresIn);
//       })
//       .catch(() => {
//         window.location = "/";
//       });
//     }, (expiresIn - 60) * 1000);
    
//     return () => clearInterval(interval);
//   }, [refreshToken, expiresIn]);
  
//   return accessToken;
// }



// export const accessToken = async (client_id, code) => {
//  const params = new URLSearchParams({
//     client_id: client_id,
//     grant_type: 'authorization_code',
//     code: code,
//     redirect_uri: 'http://localhost:3000/dashboard',
//     code_verifier: verifier
//   });

//   const result = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: params.toString()
//   });

//   const data = await result.json();
//   return data.access_token;
// };
