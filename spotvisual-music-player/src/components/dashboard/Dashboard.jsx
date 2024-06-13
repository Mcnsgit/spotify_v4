// src/components/dashboard/Dashboard.jsx
import React, { useState,useEffect } from 'react';
import SearchBar from '../reusableComponents/SearchBar/SearchBar';
import SearchResults from '../reusableComponents/SearchResults/SearchResults';
import Player from '../reusableComponents/Player/Player';
import PlaylistView from '../reusableComponents/PlaylistView/PlaylistView';
import Visualizer from '../reusableComponents/Visualizer/Visualizer';
import MainView from '../layoutComponents/views/MainView';

const dummyResults = [
  { id: '1', title: 'Song 1', artist: 'Artist 1', albumUrl: 'https://via.placeholder.com/50' },
  { id: '2', title: 'Song 2', artist: 'Artist 2', albumUrl: 'https://via.placeholder.com/50' },
  // More dummy data...
];

const dummyPlaylists = [
  { id: '1', name: 'Playlist 1', owner: 'Owner 1', imageUrl: 'https://via.placeholder.com/50' },
  { id: '2', name: 'Playlist 2', owner: 'Owner 2', imageUrl: 'https://via.placeholder.com/50' },
  // More dummy data...
];

const Dashboard = ({userData}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleTrackSelect = (track) => setSelectedTrack(track);

  useEffect(() => {
    if (selectedTrack) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [selectedTrack]);  

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setSelectedTrack((prevTrack) => (prevTrack ? null : dummyResults[0]));
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);



  return (
    <div>
      <MainView userData={userData} />
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <SearchResults results={dummyResults} onSelect={handleTrackSelect} />
      <PlaylistView playlists={dummyPlaylists} onSelect={(playlist) => console.log('Selected playlist', playlist)} />
      <Player
        track={selectedTrack}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onPrev={() => console.log('Previous track')}
        onNext={() => console.log('Next track')}
      />
      <Visualizer />
    </div>
  );
};

export default Dashboard;
