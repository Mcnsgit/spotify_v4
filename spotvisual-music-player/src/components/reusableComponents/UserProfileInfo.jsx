//!SECTION: Component to display user's image and hyperlink their username to their Spotify profile.

import React from 'react';
import PropTypes from 'prop-types';

const UserProfileInfo = (props) => {
    return (
        <div className="profile-info">
            <div className="profile-info__name">{props.name}</div>
            <div className="profile-info__email">{props.email}</div>
            <div className="profile-info__uri">{props.uri}</div>
            <div className="profile-info__url">{props.url}</div>
            <div className="profile-info__image">{props.image}</div>
        </div>
    );
};

UserProfileInfo.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    uri: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string
};

UserProfileInfo.defaultProps = {
    name: '',
    email: '',
    uri: '',
    url: '',
    image: ''
};

export default function UserProfile(props) {
    return (
        <div className="user-profile">
            <UserProfileInfo
                name={props.name}
                email={props.email}
                uri={props.uri}
                url={props.url}
                image={props.image}
            />
        </div>
    );
}