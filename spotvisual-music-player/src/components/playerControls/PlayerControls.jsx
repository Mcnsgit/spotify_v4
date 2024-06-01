import React from "react";
import PropTypes from "prop-types";
import SongControls from "./songControls/index.jsx";
import VolumeControls from "./volume/Volume.jsx";
import "./PlayerControls.scss";

const PlayerControls = ({ stopSong, pauseSong, resumeSong, audioControl }) => (
  <div className="player-controls">
    <SongControls
      stopSong={stopSong}
      pauseSong={pauseSong}
      resumeSong={resumeSong}
      audioControl={audioControl}
    />
    <VolumeControls />
  </div>
);


PlayerControls.propTypes = {
  stopSong: PropTypes.func,
  pauseSong: PropTypes.func,
  resumeSong: PropTypes.func,
  audioControl: PropTypes.func
};

export default PlayerControls; 