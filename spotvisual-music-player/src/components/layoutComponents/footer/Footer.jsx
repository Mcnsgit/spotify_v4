// **Footer** - Container for song details and music controls.

import PlayerControls from '../playerControls/PlayerControls.jsx';

import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
    <footer className="footer">

      <SongDetails />

      <PlayerControls />
    </footer>
    </div>
  );
};

export default Footer;