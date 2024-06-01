import React from 'react';

import Dashboard from './components/dashboard/Dashboard.jsx';
import Login from './components/login/Login.jsx';

import { Container } from './styles/App.styles.jsx';

const App = () => {
  const code = new URLSearchParams(window.location.search).get('code');

  return <Container>{code ? <Dashboard code={code} /> : <Login />}</Container>;
};

export default App;