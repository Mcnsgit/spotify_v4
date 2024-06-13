import React from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { useSpotifyPlayer } from 'react-spotify-web-playback-sdk';
import { useEffect, useState } from 'react';




const SpotifyApi = new SpotifyWebApi(
    {
        clientId: process.env.REACT_APP_CLIENT_ID
    }
);

function Songs() {

    const player = useSpotifyPlayer();
    const playbackState = usePlaybackState();
    const playerDevice = usePlayerDevice();

    useEffect(() => {
        if (playerDevice) {
            console.log('Player Device ID:', playerDevice.device_id);
        }
    }, [playerDevice]);

    useEffect(() => {
        if (playbackState) {
            console.log('Currently Playing:', playbackState.track_window.current_track);
        }
    }, [playbackState]);

    if (!player) {
        return <div>Loading...</div>;
    }   

    const togglePlay = () => {  
        player.togglePlay();
    }; 

    const disconnectPlayer = () => player.disconnect(); 

    const playTrack = uri => player.play({ uris: [uri] });

    const playContext = uri => player.play({ context_uri: uri });

    const pausePlayback = () => player.pause();

    return (
        <div>
            <h1>Spotify Web Playback SDK Quick Start</h1>
            <button id="togglePlay">Toggle Play</button>
        </div>
    );

}

export default Songs;