import React from 'react';
import PropTypes from 'prop-types';
import {
  ResultContainer,
  ResultImage,
  SongContainer,
  TitleText,
  ArtistText,
} from './styles/TrackSearchResults.styles.jsx';

const TrackSearchResult = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <ResultContainer onClick={handlePlay}>
      <ResultImage src={track.albumUrl} alt={track.title} />
      <SongContainer>
        <TitleText>{track.title}</TitleText>
        <ArtistText>{track.artist}</ArtistText>
      </SongContainer>
    </ResultContainer>
  );
};

TrackSearchResult.propTypes = {
  track: PropTypes.object.isRequired,
  chooseTrack: PropTypes.func.isRequired,
};

export default TrackSearchResult;
