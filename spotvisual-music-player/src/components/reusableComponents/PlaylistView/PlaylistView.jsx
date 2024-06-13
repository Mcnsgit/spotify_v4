// src/components/reusable/PlaylistView.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './PlaylistView.css';

const PlaylistView = ({ playlists, onSelect }) => (
  <div className="playlist-view">
    {playlists.map((playlist) => (
      <div key={playlist.id} className="playlist-view__item" onClick={() => onSelect(playlist)}>
        <img src={playlist.imageUrl} alt={playlist.name} className="playlist-view__image" />
        <div className="playlist-view__info">
          <span className="playlist-view__name">{playlist.name}</span>
          <span className="playlist-view__owner">{playlist.owner}</span>
        </div>
      </div>
    ))}
  </div>
);

PlaylistView.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PlaylistView;
