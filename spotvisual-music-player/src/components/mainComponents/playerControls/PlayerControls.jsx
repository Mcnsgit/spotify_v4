
import PropTypes from "prop-types";
import SongControls from "./songControls/index.jsx";
import VolumeControls from "./volume/Volume.jsx";
import "./PlayerControls.css";
import React, { useState, useEffect } from 'react';
import { useSpotifyPlayer, usePlaybackState } from 'react-spotify-web-playback-sdk';


const PlayerControls = () => {
  const playbackState = usePlaybackState();
  const player = useSpotifyPlayer();
  const [isPaused, setPaused] = useState(false);

  useEffect(() => {
    if (playbackState) {
      setPaused(playbackState.paused);
    }
  }, [playbackState]);

  if (!playbackState || !player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player-controls">
      <button onClick={() => player.previousTrack()}>&lt;&lt;</button>
      <button onClick={() => player.togglePlay()}>{isPaused ? 'PLAY' : 'PAUSE'}</button>
      <button onClick={() => player.nextTrack()}>&gt;&gt;</button>
    </div>
  );
};

export default PlayerControls;