import React, { useCallback } from 'react';
// import PropTypes from 'prop-types';
import MainView from '../../components/layoutComponents/views/MainView.jsx';
// import PlayerControls from '../../components/mainComponents/playerControls/PlayerControls.jsx'; 


const Dashboard = ({ token }) => {
  const getOAuthToken = useCallback(callback => {
    callback(token);
  }, [token]);

  return (
    <MainView>

      <Dashboard />
      

    </MainView>
  );
};



export default Dashboard;