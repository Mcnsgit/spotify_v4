// src/components/layout/Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import CurrentTrack from  './songDetails/CurrentTrack';
import PlayerControls from '../../mainComponents/playerControls/PlayerControls';
import Volume from '../../mainComponents/playerControls/volume/Volume';
import './Footer.css';

export default function Footer() {
  return (
    <Container>
      <CurrentTrack />
      <PlayerControls />
      <Volume />
    </Container>
  );
}

