import React from 'react';
import './MainView.css';
import Header from '../components/layoutComponents/header/Header';
import Footer from '../components/layoutComponents/footer/Footer';
import SideMenu from '../components/layoutComponents/SideMenu/SideMenu';
import Dashboard from '../components/mainComponents/dashboard/Dashboard';
// import SplitScreen from '../components/reusableComponents/splitScreen/SplitScreen';

const SideMenu = () => {
  return (
    <div className="left-component">
      <h1>Left Component</h1>
    </div>
  );
};
const RightComponent = ({title}) => {
  return (
    <div className="right-component">
      <h1>Right Component</h1>
    </div>
  );
};
const MainView = () => {
  return (
    <div>
      <Header />
      <SideMenu  />
      <Dashboard />
      <RightComponent />
      <Footer />
    </div>
  );
};
export default MainView;