// src/components/reusable/Player.jsx
import React from 'react';
import PlayerControls from '../../mainComponents/playerControls/PlayerControls';
import PropTypes from 'prop-types';
import './Player.css';

const Player = ({ track, isPlaying, onPlayPause, onPrev, onNext }) => (
  <div className="player">
    <div className="player__details">
      {track ? (
        <>
          <img src={track.albumUrl} alt={track.title} className="player__image" />
          <div className="player__info">
            <span className="player__title">{track.title}</span>
            <span className="player__artist">{track.artist}</span>
          </div>
        </>
      ) : (
        <span>No track selected</span>
      )}
    </div>
    <PlayerControls
      isPlaying={isPlaying}
      onPlayPause={onPlayPause}
      onPrev={onPrev}
      onNext={onNext}
    />
  </div>
);

Player.propTypes = {
  track: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    albumUrl: PropTypes.string.isRequired,
  }),
  isPlaying: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

Player.defaultProps = {
  track: null,
};

export default Player;
