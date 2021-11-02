import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./FloatingCart.scss";
import { ShoppingCart } from "react-feather";

const FloatingCart = ({ setStateAnim, setHomePage, setActiveAnim }) => {

  /* Appel du state */
  const shoppingCart = useSelector((state) => ({
    ...state.cartReducer,
  }));

  /* Nombre éléments dans le panier */

  let totalItems = 0;
  for (const item of shoppingCart.cart) {
    totalItems += item.quantity;
  }

  const cartRef = useRef();
  const history = useHistory()

  useEffect(() => {
    if(history.location.pathname === '/panier') {
      let cartRefe = cartRef.current.getBoundingClientRect();
      setHomePage(false);
      setActiveAnim(cartRefe.left + cartRefe.width / 2);
    }
  }, [history.location.pathname])



  return (
    <NavLink
      className="floating-cart"
      activeClassName="floating-cart-active"
      to="/panier"
      ref={cartRef}
      onClick={() => setStateAnim(5)}
    >
      <ShoppingCart />
      <span className="nb-items">{totalItems}</span>
    </NavLink>
  );
};

export default FloatingCart;
