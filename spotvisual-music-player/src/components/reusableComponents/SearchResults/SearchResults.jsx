// src/components/reusable/SearchResults.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';

const SearchResults = ({ results, onSelect }) => (
  <div className="search-results">
    {results.map((result) => (
      <div key={result.id} className="search-result" onClick={() => onSelect(result)}>
        <img src={result.albumUrl} alt={result.title} className="search-result__image" />
        <div className="search-result__info">
          <span className="search-result__title">{result.title}</span>
          <span className="search-result__artist">{result.artist}</span>
        </div>
      </div>
    ))}
  </div>
);

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    albumUrl: PropTypes.string.isRequired,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SearchResults;
