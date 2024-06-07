
import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

function Playlist() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Fetch user playlists
    spotifyApi.getUserPlaylists().then((response) => {
      setPlaylists(response.items);
    });
  }, []);

  return (
    <div>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;