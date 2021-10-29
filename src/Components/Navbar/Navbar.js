import React from 'react';
import './Navbar.scss';
import {NavLink} from 'react-router-dom'
import FloatingCart from '../FloatingCart/FloatingCart';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">Acceuil</NavLink>
      <NavLink to="/produits">Shop</NavLink>
      <NavLink to="/à-propos">A propos</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <FloatingCart/>
    </nav>
  );
};

export default Navbar;