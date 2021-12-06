import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuResponsive.scss";

import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "react-feather";

const MenuResponsive = () => {
  const { openMenu } = useSelector((state) => ({
    ...state.appReducer,
  }));

  const dispatch = useDispatch();

  const changePageFunc = () => {
    dispatch({
      type: "CHANGEPAGE",
    });
  };

  const openMenuFunc = () => {
    dispatch({
      type: "OPENMENU",
    });
  };

  const shoppingCart = useSelector((state) => ({
    ...state.cartReducer,
  }));

  let totalItems = 0;
  for (const item of shoppingCart.cart) {
    totalItems += item.quantity;
  }

  return (
    <>
    {openMenu && <div className="overlay" onClick={() => openMenuFunc()}></div>}
      <nav
        className={openMenu ? "menu-responsive active-menu" : "menu-responsive"}
      >
        <div className="link">
          <NavLink
            className="nav-page"
            activeClassName="active-nav-page"
            exact
            to="/"
            onClick={() => {
              changePageFunc();
              openMenuFunc();
            }}
          >
            Acceuil
          </NavLink>
          <NavLink
            className="nav-page"
            activeClassName="active-nav-page"
            to="/produits"
            onClick={() => {
              changePageFunc();
              openMenuFunc();
            }}
          >
            Shop
          </NavLink>
          <NavLink
            className="nav-page"
            activeClassName="active-nav-page"
            to="/à-propos"
            onClick={() => {
              changePageFunc();
              openMenuFunc();
            }}
          >
            A propos
          </NavLink>
          <NavLink
            className="nav-page"
            activeClassName="active-nav-page"
            to="/contact"
            onClick={() => {
              changePageFunc();
              openMenuFunc();
            }}
          >
            Contact
          </NavLink>
          <NavLink
            className="floating-cart"
            activeClassName="floating-cart-active"
            to="/panier"
            onClick={() => {
              openMenuFunc();
              changePageFunc();
            }}
          >
            <ShoppingCart />
            <span className="nb-items">{totalItems}</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default MenuResponsive;
