
import React from "react";
import "./Audioplayer.scss";
import { BsUpload } from "react-icons/bs";
import { BsFillMicFill } from "react-icons/bs";
import testMusic from "../../assets/Music/test-audio2.mp3";
import RickRoll from "../../assets/Music/RickRoll.mp3";

const AudioPlayer = ({ togglePlay, setComponentState }) => {
  return (
    <div className="audio-player">
      <div className="audio-player__options">
        <BsUpload
          onClick={() => setComponentState("upload")}
          className="audio-player__icon"
        />
        <BsFillMicFill
          onClick={() => setComponentState("microphone")}
          className="audio-player__icon"
        />
      </div>
      <div className="audio-player__container">
        <audio
          id="myAudio"
          controls
          onPlay={togglePlay}
          onPause={togglePlay}
          src={testMusic}
        ></audio>
      </div>
    </div>
  );
};

export default AudioPlayer;


// import React, { useState, useRef, useEffect, memo } from "react";
// import "./audioPlayer.css";
// import {PlayerControls} from "../playerControls/PlayerControls.jsx";
// import ProgressCircle from "./progressCircle.jsx";
// import Visualizer from "../visualizer/Visualizer.jsx";
// import Volume from "../playerControls/volume/Volume.jsx";
// import ExtraControls from "../playerControls/extraControls/ExtraControls.jsx";
// import { StateConsumer } from "../player/StateConsumer.jsx";



// export const MusicPlayer = (access_token) =memo(() => {
//   ({access_token})  => {
//     return (
//       <div className="audio-player">
//     )
//   }
//   //*state
//   const [volume, setVolume] = useState(50);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [track, setTrack] = useState({
//   title: 'Track Title',
//   artist: 'Artist Name',
//   albumCover: 'https://placehold.co/100x100',
//   });
//   const [total, setTotal] = useState([]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [trackProgress, setTrackProgress] = useState(0);
//   var audioSrc = total[currentIndex]?.track.preview_url;

//   const audioPlayer = useRef(); //* reference our audio component
//   const progressBar = useRef(); //* reference to progress bar
//   const animationRef = useRef(); //*reference the animation

//   const audioRef = useRef(new Audio(total[0]?.track.preview_url));

//   const intervalRef = useRef();

//   const isReady = useRef(false);

//   const { duration } = audioRef.current;

//   const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

//   const startTimer = () => {
//     clearInterval(intervalRef.current);

//     intervalRef.current = setInterval(() => {
//       if (audioRef.current.ended) {
//         handleNext();
//       } else {
//         setTrackProgress(audioRef.current.currentTime);
//       }
//     }, [1000]);
//   };

//   useEffect(() => {
//     if (audioRef.current.src) {
//       if (isPlaying) {
//         audioRef.current.play();
//         startTimer();
//       } else {
//         clearInterval(intervalRef.current);
//         audioRef.current.pause();
//       }
//     } else {
//       if (isPlaying) {
//         audioRef.current = new Audio(audioSrc);
//         audioRef.current.play();
//         startTimer();
//       } else {
//         clearInterval(intervalRef.current);
//         audioRef.current.pause();
//       }
//     }
//   }, [isPlaying]);

//   useEffect(() => {
//     audioRef.current.pause();
//     audioRef.current = new Audio(audioSrc);

//     setTrackProgress(audioRef.current.currentTime);

//     if (isReady.current) {
//       audioRef.current.play();
//       setIsPlaying(true);
//       startTimer();
//     } else {
//       isReady.current = true;
//     }
//   }, [currentIndex]);

//   useEffect(() => {
//     return () => {
//       audioRef.current.pause();
//       clearInterval(intervalRef.current);
//     };
//   }, []);

//   useEffect(() => {
//     const animateVisualizer = () => {
//       const ctx = canvasRef.current.getContext('2d');
//     }
//     const interval = setInterval(animateVisualizer, 100);
//     return () => clearInterval(interval);
//   }, []);
//   const addZero = (n) => {
//     return n > 9 ? "" + n : "0" + n;
//   };
//   const artists = [];
//   currentTrack?.album?.artists.forEach((artist) => {
//     artists.push(artist.name);
//   });
//   const handlePlayPause = () => {
    


    
//     // Implement play/pause logic
//   };
  
//   const handlePrevTrack = () => {
//       if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
//       else setCurrentIndex(currentIndex - 1)
//   };
//   const handleNext = () => {
//     if (currentIndex < total.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else setCurrentIndex(0);
//     };
    
//     const handleShuffle = () => {

//     // Implement shuffle logic
//     };
    
//     const handleRepeat = () => {
//     // Implement repeat logic
//     };
    
//     const handleVolumeChange = (e) => {
//     setVolume(e.target.value);
//     // Implement volume control logic
//     };
    
//     return (
//     <div className={containerClass}>
//       <div className="player-left-body">
//         <ProgressCircle
//           percentage={currentPercentage}
//           isPlaying={true}
//           image={currentTrack?.album?.images[0]?.url}
//           size={300}
//           color="#C96850"
//         />
//       </div>
//       <div className="player-right-body flex">
//         <p className="song-title">{currentTrack?.name}</p>
//         <p className="song-artist">{artists.join(" | ")}</p>
//         <div className="player-right-bottom flex">
//           <div className="song-duration flex">
//             <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
// <Visualizer />
//             <p className="duration">0:30</p>
//           </div>
//           <PlayerControls
//             isPlaying={isPlaying}
//             setIsPlaying={setIsPlaying}
//             handleNext={handleNext}
//             handlePrev={handlePrev}
//             total={total}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
