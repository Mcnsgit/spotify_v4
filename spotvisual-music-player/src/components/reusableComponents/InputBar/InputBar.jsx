//SECTION: A general input bar component for user input.
import React from 'react';
import PropTypes from 'prop-types';

import './InputBar.css';

function InputBar({ value, onChange, placeholder, className, ...props }) {
    return (
    <input 
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={'input-bar ${className}'}
        {...props}
        />
    );
}
    InputBar.propTypes = {
        value: PropTypes.string,
    onChange: PropTypes.func,
placeholder: PropTypes.string,
className: PropTypes.string,
props: PropTypes.object

    
    };

InputBar.defaultProps = {
    placeholder: '',
    className: '',
};

export default InputBar;