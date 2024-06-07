import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SideMenu.css';

// Actions
import { fetchFeatured, fetchRecentlyPlayed, fetchSongs, fetchAlbums, fetchArtists, updateHeaderTitle, updateViewType } from '../../../redux/actions/uiActions';

const SideMenu = ({
  updateHeaderTitle,
  updateViewType,
  fetchFeatured,
  fetchRecentlyPlayed,
  fetchSongs,  
  fetchAlbums,
  fetchArtists,
  token,
  title,
  artistIds
}) => {
  const handleClick = name => {
    updateHeaderTitle(name);
    updateViewType(name);
  };

  const handleBrowseClick = () => {
    updateHeaderTitle("Browse");
    updateViewType("Featured");
    fetchFeatured(token);
  };

  const renderSideMenu = () => {
    const menu = [
      {
        name: "Recently Played",
        action: fetchRecentlyPlayed
      },
      {
        name: "Songs",
        action: fetchSongs
      },
      {
        name: "Albums",
        action: fetchAlbums
      },
      {
        name: "Artists",
        action: fetchArtists,
        getArtists: true
      }
    ];

    return menu.map(item => (
      <li
        key={item.name}
        className={
          title === item.name ? "active side-menu-item" : "side-menu-item"
        }
        onClick={() => {
          item.getArtists
            ? item.action(token, artistIds)
            : item.action(token);
          handleClick(item.name);
        }}
      >
        {item.name}
      </li>
    ));
  };

  return (
    <ul className="side-menu-container">
      <li
        onClick={handleBrowseClick}
        className={
          title === "Browse" ? "active side-menu-item" : "side-menu-item"
        }
      >
        Browse
      </li>
      <li className="side-menu-item radio">Radio</li>
      <h3 className="user-library-header">Your Library</h3>
      {renderSideMenu()}
    </ul>
  );
};

SideMenu.propTypes = {
  updateHeaderTitle: PropTypes.func.isRequired,
  updateViewType: PropTypes.func.isRequired,
  fetchFeatured: PropTypes.func.isRequired,
  fetchRecentlyPlayed: PropTypes.func.isRequired,
  fetchSongs: PropTypes.func.isRequired,
  fetchAlbums: PropTypes.func.isRequired,
  fetchArtists: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  artistIds: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

// Map state and dispatch to props
const mapStateToProps = (state) => ({
  title: state.ui.title,
  artistIds: state.ui.artistIds,
  token: state.auth.token // Ensure the token is part of the Redux state
});

const mapDispatchToProps = {
  updateHeaderTitle,
  updateViewType,
  fetchFeatured,
  fetchRecentlyPlayed,
  fetchSongs,
  fetchAlbums,
  fetchArtists
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
