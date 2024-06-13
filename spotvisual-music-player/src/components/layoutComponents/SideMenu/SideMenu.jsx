// src/components/layout/SideMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => (
  <nav className="side-menu">
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/settings">Settings</Link></li>
      <li><Link to="/analytics">Analytics</Link></li>
      <li><Link to="/logout">Sign Out</Link></li>
    </ul>
  </nav>
);

export default SideMenu;
