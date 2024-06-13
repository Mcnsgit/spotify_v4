// src/components/reusable/UserProfile.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './UserProfile.css';

const UserProfile = ({ user }) => (
  <div className="user-profile">
    <img src={user.imageUrl} alt={user.name} className="user-profile__image" />
    <a href={user.profileUrl} className="user-profile__name">
      {user.name}
    </a>
  </div>
);

UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    profileUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;
