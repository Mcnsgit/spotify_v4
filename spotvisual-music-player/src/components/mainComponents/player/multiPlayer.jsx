import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Audioplayer.scss";

import { BsUpload } from "react-icons/bs";
import { BsFillMicFill } from "react-icons/bs";
import WebPlayback from "./playback.jsx";
import Progress from "./progress/Progress.jsx";
import SongDetails from "./songDetails/SongDetails.jsx";
import testMusic from "../../assets/Music/test-audio2.mp3";
import RickRoll from "../../assets/Music/RickRoll.mp3";
import {PlayerControls} from "../playerControls/PlayerControls.jsx"
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
;

const UnifiedAudioPlayer = ({ token, setComponentState, playingTrack }) => {
  const [play, setPlay] = useState(false);
  const [trackUri, setTrackUri] = useState('');
  const [isLocalFile, setIsLocalFile] = useState(true);
  const [localFile, setLocalFile] = useState(testMusic);
  const audioRef = useRef();

  useEffect(() => {
    if (playingTrack) {
      setTrackUri(playingTrack.uri);
      setIsLocalFile(false);
    }
  }, [playingTrack]);

  useEffect(() => {
    if (trackUri || localFile) {
      setPlay(true);
    }
  }, [trackUri, localFile]);


  const onTrackChange = (track) => {
    setIsLocalFile(false);
    setTrackUri(track.uri);
  };

  const onTogglePlay = () => setPlay(!play);

  const handleFileUpload = (event) => {
    setIsLocalFile(true);
    setTrackUri('');
    const file = URL.createObjectURL(event.target.files[0]);
    setLocalFile(file);
  };

 const setupAudioContext = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const audioContext = new window.AudioContext();
      const source = audioContext.createMediaElementSource(audioElement);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      analyser.fftSize = 1024;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      return { analyser, dataArray };
    }
  };

  useEffect(() => {
    if (play) {
      const { analyser, dataArray } = setupAudioContext();
      const render = () => {
        if (analyser) {
          analyser.getByteFrequencyData(dataArray);
          requestAnimationFrame(render);
        }
      };
      render();
    }
  }, [play]);

  return (
    <div className="audio-player">
      <div className="audio-player__options">
        <label htmlFor="upload-file" className="audio-player__icon">
          <BsUpload />
        </label>
        <input
          type="file"
          id="upload-file"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <BsFillMicFill
          onClick={() => setComponentState("microphone")}
          className="audio-player__icon"
        />
      </div>
      <div className="audio-player__container">
        {isLocalFile ? (
          <audio
            ref={audioRef}
            id="myAudio"
            controls
            onPlay={() => setPlay(true)}
            onPause={() => setPlay(false)}
            src={localFile}
          ></audio>
        ) : (
          <SpotifyWebPlayback token={token} onTrackChange={onTrackChange} />
        )}
      </div>
      <div className="player__controls">
        <PlayerControls
          onTogglePlay={onTogglePlay}
          play={play}
          volume={0.7}
          setVolume={() => {}}
        />
      </div>
      <div className="player__content">
        <div className="player__cover">
          <SongDetails
            song={{ title: playingTrack?.name || 'No song', artist: playingTrack?.artists?.[0]?.name || 'No artist' }}
            Visualizer={null}
            source={null}
            analyser={null}
            currentSongIndex={0}
          />
        </div>
      </div>
      <Progress value={0} onChange={() => {}} />
    </div>
  );
};

export default UnifiedAudioPlayer;