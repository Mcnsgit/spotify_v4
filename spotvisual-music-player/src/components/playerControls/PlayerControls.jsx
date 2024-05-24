import React from 'react';
import { PlayCircle, PauseCircle, SkipEnd, SkipStart, Repeat, Repeat1, Shuffle } from 'react-bootstrap-icons';
import '../../styles/PlayerControls.css';
import Volume from './volume/Volume';
import ExtraControls from './extraControls/ExtraControls';

const PlayerControls = ({
  volume = 0.7,
  setVolume = () => {},
  next = () => {},
  prev = () => {},
  children,
  className = '',
  error = null,
  onVolumeChange = () => {},
  onToggleMute = () => {},
  isPlaying = false,
  toggleIsPlaying = () => {},
  shuffle = false,
  toggleShuffle = () => {},
  repeat = false,
  toggleRepeat = () => {}
}) => {
  return (
    <div className="playerControls">
      <button aria-label="Previous" onClick={prev}>
        <SkipStart />
      </button>
      <button aria-label={isPlaying ? "Pause" : "Play"} onClick={toggleIsPlaying}>
        {isPlaying ? <PauseCircle /> : <PlayCircle />}
      </button>
      <button aria-label="Next" onClick={next}>
        <SkipEnd />
      </button>
      <Volume value={volume} onChange={setVolume} onVolumeChange={onVolumeChange} />
      <ExtraControls onToggleMute={onToggleMute} />
      <button aria-label="Volume" onClick={onToggleMute}>
        {isPlaying ? <PauseCircle /> : <PlayCircle />}
      </button>
      <button aria-label="Shuffle" onClick={toggleShuffle}>
        <Shuffle color={shuffle ? 'yellow' : 'white'} />
      </button>
      <button aria-label="Repeat" onClick={toggleRepeat}>
        {repeat ? <Repeat1 color="yellow" /> : <Repeat />}
      </button>
    </div>
  );
};

export default PlayerControls;
