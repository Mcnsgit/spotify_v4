import React from 'react';
import './MainView.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout = () => {
  return (
    <div>
      <Header />
      <MainView />
      <Footer />
    </div>
  );
};


const MainView = () => {
  return (
    <Layout />
  );
  
};

export default MainView;