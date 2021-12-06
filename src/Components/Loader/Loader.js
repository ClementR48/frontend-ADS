import React from 'react';
import ScrollToTop from "../ScrollToTop";
import './Loader.scss'

const Loader = () => {
  return (
    <div className="loader">
      <ScrollToTop/>
      <img src='/assets/images/logoRose.png' alt="logo" />
      
    </div>
  );
};

export default Loader;