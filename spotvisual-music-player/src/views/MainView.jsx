import React from 'react';
import './MainView.css';
import Header from '../components/layoutComponents/header/Header';
import Footer from '../components/layoutComponents/footer/Footer';
import SplitScreen from '../components/reusableComponents/splitScreen/SplitScreen';

const LeftComponent = ({title}) => {
  return (
    <div className="left-component">
      <h1>Left Component</h1>

    </div>
  );
};


const RightCOmponent = ({title}) => {
  return (
    <div className="right-component">
      <h1>Right Component</h1>
    </div>
  );
};

const middleComponent = ({title}) => {
  return (
    <div className="middle-component">
      <h1>Middle Component</h1>
    </div>
  );
};

const MainView = () => {
  return (
    <SplitScreen
      leftWidth={35}
      middleWidth={50}
      rightWidth={25}
    >
      <LeftComponent />
      <middleComponent />
      <RightCOmponent />
    </SplitScreen>
  );
};
  return (
    <div>
      <Header />
      <LayoutContent />
      <Footer />
    </div>
  );


export default MainView;