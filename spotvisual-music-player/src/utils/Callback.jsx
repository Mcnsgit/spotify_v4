import { useEffect } from 'react';
import axiosInstance from './axios.jsx';

const Callback = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    const getToken = async () => {
      const { access_token, refresh_token } = await axiosInstance(code);

      // Store the access_token and refresh_token in your application state or local storage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // Redirect to the dashboard
      window.location.href = '/dashboard';

      // You can also log the access_token and refresh_token
      console.log('Access Token:', access_token);
      console.log('Refresh Token:', refresh_token);
    }

    getToken();
  }, []);

  return (
    <div>
      <h1>Authenticating with Spotify...</h1>
    </div>
  );
}

export default Callback;