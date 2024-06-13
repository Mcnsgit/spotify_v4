import React from "react";
import SongImage from "./songImage/SongImage.jsx";
import PropTypes from "prop-types";

import "./SongDetails.css";

const SongDetails = ({ track }) => {
    return (
        <div className="song-details-container">
            <SongImage track={track} />
            <SongDetails track={track} />
        
        const imageUrl = track.album?.images[0]?.url || "";
            <div className="song-details">
                <img src={imageUrl} alt={track.name} />
                <div className="details">
                    <h3>{track.name}</h3>
                    <p>{track.artists?.map(artist => artist.name).join(', ')}</p>
                </div>
            </div>
        </div>
                ) 
            }

    SongDetails.defaultProps = {
        track: {},
    };

    SongDetails.propTypes = {
        track: PropTypes.object.isRequired,
    };

    export default SongDetails;
