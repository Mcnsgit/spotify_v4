import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Player from '../player/Player';
import Search from './search/Search';
import { playTrack } from '../../redux/actions/playerActions';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
  clientId: '1f42356ed83f46cc9ffd35c525fc8541',
  clientSecret: '487ec052888b4917b00665fc65b8df9f',
  redirectUri: 'http://localhost:3000'
});

const Dashboard = ({ token }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [lyrics, setLyrics] = useState('');

  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token);
  }, [token]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch('');
    dispatch(playTrack(track.uri));
  };

  useEffect(() => {
    if (!playingTrack) return;

    axios.get('http://localhost:3001/nowplaying', {
      params: {
        track: playingTrack?.uri,
        artist: playingTrack?.artist,
      },
    }).then(res => {
      setLyrics(res.data.lyrics);
    });
  }, [playingTrack]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!token) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, token]);

  return (
    <div className="d-flex flex-column py-2" style={{ height: '100vh' }}>
      <Search search={search} setSearch={setSearch} />
      <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
        {searchResults.map(track => (
          <div key={track.uri} onClick={() => chooseTrack(track)}>
            <img src={track.albumUrl} alt={track.title} />
            <div>{track.title}</div>
            <div>{track.artist}</div>
          </div>
        ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: 'pre' }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={token} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
};

export default Dashboard;
