import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuResponsive.scss";
import FloatingCart from "../FloatingCart/FloatingCart";
import { useSelector } from "react-redux";

const MenuResponsive = () => {
  const { openMenu } = useSelector((state) => ({
    ...state.appReducer,
  }));

  return (
    <nav className={'menu-responsive ' + (openMenu && 'active-menu')}>
      <div className="link">
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          exact
          to="/"
        >
          Acceuil
        </NavLink>
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          to="/produits"
        >
          Shop
        </NavLink>
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          to="/à-propos"
        >
          A propos
        </NavLink>
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          to="/contact"
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default MenuResponsive;
