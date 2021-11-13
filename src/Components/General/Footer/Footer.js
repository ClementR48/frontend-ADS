import React from 'react';
import { useSelector } from 'react-redux';
import './Footer.scss';

const Footer = () => {

  const {colorFooter} = useSelector((state) => ({
    ...state.appReducer
  }))
  
  return (
    
      <footer style={{background: colorFooter}} className="footer">
      <img src='/assets/images/logo2petit.png' alt="logo"></img>
      <ul className="listSocialNetwork">
        <li><span>Email:</span> atelierDelSol@gmail.com</li>
        <li><span>Instagram:</span> @atelierDelSol</li>
        <li><span>Facebook:</span> Atelier Del Sol</li>
      </ul>
    </footer>
    
  );
};

export default Footer;