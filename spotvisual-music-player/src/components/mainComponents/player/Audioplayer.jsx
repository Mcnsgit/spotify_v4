import React, { Component } from 'react';

import './songsPlayer.scss';

import DetailSection from './playerControls/components/detailSection';
import SongsControl from './playerControls/components/songsControl';
import VolumeControl from './playerControls/components/Volume';
import SongSider from './playerControls/components/songSider';
import withPlayer from '../../../hoc/playerHoc';
import ProgressBar from './ProgressBar.jsx';
const Audioplayer = ({ track, isPlaying, onSeek, currentSong, trackPosition, seekSong, contains }) => {
  const toSeconds = (ms) => ms / 1000;
  const position = toSeconds(trackPosition) || 0;
  const duration = currentSong ? toSeconds(currentSong.duration_ms) : 1;

  const handleSeek = (time) => {
      if (onSeek) {
          onSeek(time);
      }
  };

  return (
      <div className="player-container">
          {currentSong && currentSong.id ? (
              <DetailSection
                  ids={
                      currentSong.linked_from?.id
                          ? `${currentSong.linked_from.id},${currentSong.id}`
                          : currentSong.id
                  }
                  contains={contains}
                  songName={currentSong.name || ''}
                  album={currentSong.album.uri.split(':')[2]}
                  artists={currentSong.artists || []}
              />
          ) : null}
          <SongsControl track={track} isPlaying={isPlaying} />
          <SongSider
              isEnabled
              value={position / duration}
              position={position}
              duration={duration}
              onChange={(value) => seekSong(Math.round(value * duration * 1000))}
          />
          <VolumeControl />
          <ProgressBar
              currentTime={position}
              duration={duration}
              onSeek={handleSeek}
          />
      </div>
  );
};

export default withPlayer(Audioplayer);