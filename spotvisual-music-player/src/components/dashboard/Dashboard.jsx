    import React, { useState, useEffect } from 'react';
    import useAuth from '../../utils/useAuth.js';
    import { Player } from '../player/Player.jsx';
    import TrackSearchResult from './search/TrackSearchResults.jsx';
    import SpotifyWebApi from 'spotify-web-api-node';
    import PlayerController from '../playerControls/PlayerControls.jsx';
    import axios from 'axios';
    import {
      DashBoardContainer,
      SearchInput,
      ResultsContainer,
      LyricsContainer,
      PlayerContainer,
    } from '../../styles/DashboardStyles.jsx';
    import ReactiveCanvasOne from '../visualizer/canvas/CanvasPlayer.jsx';
    import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk';

    const spotifyApi = new SpotifyWebApi({ 
      clientId: '1f42356ed83f46cc9ffd35c525fc8541'
    });

    const Dashboard = ({ code }) => {
      const accessToken = useAuth(code);
      const [search, setSearch] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [playingTrack, setPlayingTrack] = useState();
      const [lyrics, setLyrics] = useState('');
    
      function chooseTrack(track) {
        setPlayingTrack(track);
        setSearch('');
        setLyrics('');
      }
    
      useEffect(() => {
        if (!playingTrack) return;
    
        axios.get('http://localhost:3001/auth/lyrics', {
          params: {
            track: playingTrack.title,
            artist: playingTrack.artist,
          },
        }).then(res => {
          setLyrics(res.data.lyrics);
        });
      }, [playingTrack]);
    
      useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
      }, [accessToken]);
    
      useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;
    
        let cancel = false;
        spotifyApi.searchTracks(search).then(res => {
          if (cancel) return;
          setSearchResults(res.body.tracks.items.map(track => {
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
          }));
        });
    
        return () => (cancel = true);
      }, [search, accessToken]);
    
      const getOAuthToken = callback => {
        callback(accessToken);
      };
    
      return (
        <WebPlaybackSDK
          initialDeviceName="Spotify Player on Next.js"
          getOAuthToken={getOAuthToken}
          connectOnInitialized={true}
          initialVolume={0.5}
        >
          <DashBoardContainer>
            <SearchInput
              id='searchInput'
              type="search"
              placeholder="Search Songs/Artists"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ResultsContainer>
              {searchResults.map((track) => (
                <TrackSearchResult
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                />
              ))}
            </ResultsContainer>
            <PlayerController>
              <div className='main-ui'>
                <PlayerContainer>
                  <ReactiveCanvasOne accessToken={accessToken} playingTrack={playingTrack} />
                  <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
                </PlayerContainer>
              </div>
            </PlayerController>
            {searchResults.length === 0 && (
              <LyricsContainer>{lyrics}</LyricsContainer>
            )}
          </DashBoardContainer>
        </WebPlaybackSDK>
      );
    };
    
    export default Dashboard;