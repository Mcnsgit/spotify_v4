//!SECTION dynamic Header Container for the search bar, user image, and username.
import React from 'react';
import searchReducer from '../../../redux/reducers/searchReducer';
import './Header.css';


//!SECTION Implement user image and username hyperlink
//!SECTION Implement user image and username hyperlink

const Header = ({children}) => {


  return (
    <div className="header-container">

    <header className="header">
      <div className="search-bar">
        {/* Implement search bar functionality */}
      </div>
      <children />
      <div className="user-info">
        <img src="user-image-url" alt="User" />
        <a href="spotify-profile-url">Username</a>
      </div>
    </header>
    </div>    
  );
};

export default Header;