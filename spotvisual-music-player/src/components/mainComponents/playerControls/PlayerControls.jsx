// src/components/reusableComponents/Player/PlayerControls.jsx
import React from 'react';
import { usePlaybackState, usePlayerDevice } from 'react-spotify-web-playback-sdk';

const PlayerControls = () => {
  const playbackState = usePlaybackState();
  const playerDevice = usePlayerDevice();

  if (!playbackState || !playerDevice) {
    return <div>Loading...</div>;
  }

  const { paused, track_window: { current_track } } = playbackState;

  return (
    <div>
      <div>
        <img src={current_track.album.images[0].url} alt={current_track.name} style={{ width: '50px' }} />
        <div>{current_track.name}</div>
        <div>{current_track.artists[0].name}</div>
      </div>
      <div>
        <button onClick={() => playerDevice.togglePlay()}>{paused ? 'Play' : 'Pause'}</button>
      </div>
    </div>
  );
};

export default PlayerControls;
