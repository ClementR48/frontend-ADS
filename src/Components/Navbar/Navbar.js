import React from 'react';
import './Navbar.scss';
import {NavLink} from 'react-router-dom'
import FloatingCart from '../FloatingCart/FloatingCart';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={process.env.PUBLIC_URL + './assets/images/logo2petit.png'} alt="logo"/>
      <NavLink className="nav-page" activeClassName="active-nav-page" exact to="/">Acceuil</NavLink>
      <NavLink className="nav-page" activeClassName="active-nav-page" to="/produits">Shop</NavLink>
      <NavLink className="nav-page" activeClassName="active-nav-page" to="/à-propos">A propos</NavLink>
      <NavLink className="nav-page" activeClassName="active-nav-page" to="/contact">Contact</NavLink>
      <FloatingCart/>
    </nav>
  );
};

export default Navbar;