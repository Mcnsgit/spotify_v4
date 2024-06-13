// src/components/reusable/SearchBar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange }) => (
  <input
    type="text"
    value={searchTerm}
    onChange={onSearchChange}
    placeholder="Search for songs, artists..."
    className="search-bar"
  />
);

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
