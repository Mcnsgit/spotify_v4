// src/components/layout/Header.jsx
import React  from 'react';
import PropTypes from 'prop-types';
import InputBar from '../../reusableComponents/InputBar/InputBar';
import UserProfile from '../../reusableComponents/userProfile/UserProfile';
import './Header.css';

const Header = ({ searchValue, onSearchChange, user }) => (
  <header className="header">
    <InputBar value={searchValue} onChange={onSearchChange} placeholder="Search..." />
    <UserProfile user={user} />
  </header>
);

Header.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    profileUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
