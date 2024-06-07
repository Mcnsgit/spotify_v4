//SECTION: A general input bar component for user input.
import React from 'react';
import PropTypes from 'prop-types';

function InputBar({ placeholder }) {
    return (
        <div className="input-bar">
            <input type="text" placeholder={placeholder} />
        </div>
    );
}

InputBar.propTypes = {
    placeholder: PropTypes.string
};

InputBar.defaultProps = {
    placeholder: ''
};

export default InputBar;