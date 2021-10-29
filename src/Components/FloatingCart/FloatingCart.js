import React from 'react';
import { NavLink } from 'react-router-dom';
import './FloatingCart.scss'

const FloatingCart = () => {
  return (
    <NavLink 
    className='floating-cart'
    to="/panier"
    >
      Panier
    </NavLink>
  );
};

export default FloatingCart;