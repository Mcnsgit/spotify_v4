import React, { useReducer } from 'react';
import styled from 'styled-components';
// Initial state for the CurrentTrack component
const initialState = {
  track: null,
};

// Reducer function to handle state changes
const currentTrackReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRACK':
      return { ...state, track: action.payload };
    default:
      return state;
  }
};

const CurrentTrack = ({ currentTrack }) => {
  const [state, dispatch] = useReducer(currentTrackReducer, initialState);

  // Sync internal state with props
  React.useEffect(() => {
    dispatch({ type: 'SET_TRACK', payload: currentTrack });
  }, [currentTrack]);

  return (
    <div>
      {state.track ? (
        <p>Now playing: {state.track.name}</p>
      ) : (
        <p>No track playing</p>
      )}
    </div>
  );
};

export default CurrentTrack;

// import React, { useEffect } from "react";


// import "./SongDetails.css";
// import styled from "styled-components";
// import { useStateProvider } from "../../../../utils/stateProvider";
// import { reducerCases } from "../../../../redux/common/constants";
// import axios from "axios";

// export default function CurrentTrack() {
//   const [state, dispatch] = useStateProvider();
//   const { currentTrack } = state;


//   useEffect(() => {
//     const getCurrentTrack = async () => {
//       const response = await axios.get(
//         "https://api.spotify.com/v1/me/player/currently-playing",
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (response.data !== "") {
//         const { item } = response.data;
//         const currentlyPlaying = {
//           id: item.id,
//           name: item.name,
//           artists: item.artists.map((artist) => artist.name),
//           image: item.album.images[2] && item.album.images[2].url,
//         };
//         dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
//       }
//     };
//     getCurrentTrack();
//   }, [token, dispatch, currentlyPlaying]);
//   return (
//     <Container>
//       {currentlyPlaying && (
//         <div className="track">
//           <div className="track_image">
//             <img src={currentlyPlaying.image} alt="currentlyPlayingImg" />
//           </div>
//           <div className="track_info">
//             <h4>{currentlyPlaying.name}</h4>
//             <p>{currentTrack?.name}</p>
//             <h6>{currentlyPlaying.artists.join(", ")}</h6>
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// }

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &_info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        color: #fff;
      }
      h6 {
        color: #b3b3b3;
      }
    }
  }
`;
