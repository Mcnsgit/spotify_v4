// src/components/layout/MainView.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './MainView.css';

const MainView = ({ children }) => (
  <div className="main-view">
    {children}
  </div>
);

MainView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainView;
