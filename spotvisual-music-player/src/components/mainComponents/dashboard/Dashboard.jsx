// src/components/dashboard/Dashboard.jsx
import React, { useReducer, useState } from 'react';
import './Dashboard.css';
import SearchBar from '../../reusableComponents/SearchBar/SearchBar';
import SearchResults from '../../reusableComponents/SearchResults/SearchResults';

import { Container } from 'react-bootstrap';
import SideMenu from '../../layoutComponents/SideMenu/SideMenu';
// Initial state for the Dashboard component
const initialState = {
  isPlaying: false,
  currentTrack: null,
};

// Reducer function to handle state changes
const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'SET_CURRENT_TRACK':
      return { ...state, currentTrack: action.payload };
    default:
      return state;
  }
};

// Dummy fetch function to simulate API call
const fetchSearchResults = async (query) => {
  // This should be replaced with the actual API call
  return [
    { id: '1', title: 'Song 1', artist: 'Artist 1', albumUrl: 'https://via.placeholder.com/50' },
    { id: '2', title: 'Song 2', artist: 'Artist 2', albumUrl: 'https://via.placeholder.com/50' },
    // More dummy data...
  ];
};

const Dashboard = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const { isPlaying, currentTrack } = state;

  // Fetch search results and update state accordingly
  const handleSearch = async (query) => {
    const results = await fetchSearchResults(query);
    setSearchResults(results);
  };

  const handleSelectResult = (result) => {
    dispatch({ type: 'SET_CURRENT_TRACK', payload: result });
    dispatch({ type: 'SET_PLAYING', payload: true });
  };

  return (
    <Container>
      <h1>Dashboard</h1>
      <SearchBar onSearchChange={(e) => handleSearch(e.target.value)} />
      <SearchResults results={searchResults} onSelect={handleSelectResult} />
      <SideMenu />
      {/* No direct PlayerControls, Volume, or CurrentTrack here */}
      {/* Footer will handle them */}
      <Footer isPlaying={isPlaying} currentTrack={currentTrack} onTogglePlay={() => dispatch({ type: 'SET_PLAYING', payload: !isPlaying })} />
    </Container>
  );
};

export default Dashboard;
