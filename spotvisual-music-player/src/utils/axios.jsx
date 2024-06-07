import axios from 'axios';
import { response } from 'express';
import { config } from 'npm';

const baseURL = 'https://api.spotify.com/v1';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const refresh_token = localStorage.getItem('refresh_token');
      try {
        const response = await axios.get('http://localhost:3001/auth/refresh',{
          params: {refresh_token: refresh_token },
        });
        localStorage.setItem('access_token', response.access_token);
        apiClient.defaults.headers.common.Authorization = `Bearer ${response.access_token}`;
        return apiClient(error.config);
      } catch (refreshError) {
        console.error('Error refreshing token', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;



     
export const getRefreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  const client_id = '1f42356ed83f46cc9ffd35c525fc8541';
  const url = 'https://accounts.spotify.com/api/token';
  try {
    const response = await apiClient.post(url, new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      client_id: client_id  
    }));      
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
  } catch (error) {
    console.error('Error refreshing token', error);
    return Promise.reject(error);
  }
}

//   getRefreshToken();
//   apiClient.interceptors.response.use(
//     response => response,
//   async error => {
//     const originalRequest = error.config;
    
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         const refresh_token = localStorage.getItem('refresh_token');
//       }

//       try {
//         const refresh_token = localStorage.getItem('refresh_token');
//         const url = 'https://accounts.spotify.com/api/token';
//         apiClient.interceptors.response.use(
//           response => response,
//         async error => {
//           const originalRequest = error.config;
          
//           if (error.response && error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
            
//             try {
//               const refresh_token = localStorage.getItem('refresh_token');
//             } catch (error) {
//               console.error('Error refreshing token', error); 
//         }
//   const response = await axios.post('http://localhost:3001/auth/refresh', {
//           params: {
//             refresh_token: refresh_token,
//           },
//         });

//         const { access_token } = response.data;
//         localStorage.setItem('access_token', access_token);

//         apiClient.defaults.headers.common.Authorization = `Bearer ${access_token}`;
//         originalRequest.headers.Authorization = `Bearer ${access_token}`;

//         return apiClient(originalRequest);
//       } catch (error) {
//         console.error('Error refreshing token', error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

