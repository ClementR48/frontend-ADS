import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './FloatingCart.scss'

const FloatingCart = () => {
  const shoppingCart = useSelector((state) => ({
    ...state.cartReducer
  }))
  let totalItems = 0;
  for(const item of shoppingCart.cart) {
    totalItems += item.quantity
  }
  return (
    <NavLink 
    className='floating-cart'
    to="/panier"
    >
      Panier
      <span>{totalItems}</span>
    </NavLink>
  );
};

export default FloatingCart;