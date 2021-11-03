import React, { useEffect, useRef, useState } from "react";
import "./Navbar.scss";
import { NavLink, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "react-feather";

const Navbar = () => {
  /* States */

  const [activeAnim, setActiveAnim] = useState();

  const { homePage, openMenu } = useSelector((state) => ({
    ...state.appReducer,
  }));

  const shoppingCart = useSelector((state) => ({
    ...state.cartReducer,
  }));

  /* Ref */

  const allLink = useRef([]);

  const addRefLink = (el) => {
    if (el && !allLink.current.includes(el)) {
      allLink.current.push(el);
    }
  };

  const anim = useRef();

  const dispatch = useDispatch();

  const openMenuFunc = () => {
    dispatch({
      type: "OPENMENU",
    });
  };

  const changePageFunc = (value) => {
    dispatch({
      type: "CHANGEPAGE",
      payload: value,
    });
  };

  /* History */
  const history = useHistory();

  const hover = (e) => {
    if (e.target.innerText === "Acceuil") {
      let ref1 = allLink.current[0].getBoundingClientRect();
      setActiveAnim(ref1.left + ref1.width / 2);
    }
    if (e.target.innerText === "Shop") {
      let ref2 = allLink.current[1].getBoundingClientRect();
      setActiveAnim(ref2.left + ref2.width / 2);
    }
    if (e.target.innerText === "A propos") {
      let ref3 = allLink.current[2].getBoundingClientRect();
      setActiveAnim(ref3.left + ref3.width / 2);
    }
    if (e.target.innerText === "Contact") {
      let ref4 = allLink.current[3].getBoundingClientRect();
      setActiveAnim(ref4.left + ref4.width / 2);
    }

    if (e.target.className === "floating-cart") {
      let ref5 = allLink.current[4].getBoundingClientRect();
      setActiveAnim(ref5.left + ref5.width / 2);
    }
  };

  const hoverOff = () => {
    if (history.location.pathname === "/") {
      let ref1 = allLink.current[0].getBoundingClientRect();
      setActiveAnim(ref1.left + ref1.width / 2);
    }

    if (history.location.pathname === "/produits") {
      let ref2 = allLink.current[1].getBoundingClientRect();

      setActiveAnim(ref2.left + ref2.width / 2);
    }
    if (history.location.pathname === "/à-propos") {
      let ref3 = allLink.current[2].getBoundingClientRect();

      setActiveAnim(ref3.left + ref3.width / 2);
    }
    if (history.location.pathname === "/contact") {
      let ref4 = allLink.current[3].getBoundingClientRect();

      setActiveAnim(ref4.left + ref4.width / 2);
    }
    if (history.location.pathname === "/panier") {
      let cartRefe = allLink.current[4].getBoundingClientRect();
      setActiveAnim(cartRefe.left + cartRefe.width / 2);
    }
  };

  useEffect(() => {
    if (history.location.pathname === "/") {
      let ref1 = allLink.current[0].getBoundingClientRect();
      setActiveAnim(ref1.left + ref1.width / 2);
    }

    if (history.location.pathname === "/produits") {
      let ref2 = allLink.current[1].getBoundingClientRect();

      setActiveAnim(ref2.left + ref2.width / 2);
    }
    if (history.location.pathname === "/à-propos") {
      let ref3 = allLink.current[2].getBoundingClientRect();

      setActiveAnim(ref3.left + ref3.width / 2);
    }
    if (history.location.pathname === "/contact") {
      let ref4 = allLink.current[3].getBoundingClientRect();

      setActiveAnim(ref4.left + ref4.width / 2);
    }
    if (history.location.pathname === "/panier") {
      let cartRefe = allLink.current[4].getBoundingClientRect();
      setActiveAnim(cartRefe.left + cartRefe.width / 2);
    }
  }, [history.location.pathname]);

  useEffect(() => {
    anim.current.style.left = `${activeAnim}px  `;
  }, [activeAnim]);

  let totalItems = 0;
  for (const item of shoppingCart.cart) {
    totalItems += item.quantity;
  }

  return (
    <nav
      className={
        homePage
          ? openMenu
            ? "home-page active"
            : "home-page"
          : openMenu
          ? "navbar active"
          : "navbar"
      }
    >
      <img
        src={process.env.PUBLIC_URL + "/assets/images/logo2petit.png"}
        alt="logo"
      />
      <div className="link">
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          exact
          to="/"
          ref={addRefLink}
          onMouseEnter={(e) => hover(e)}
          onMouseLeave={hoverOff}
          onClick={() => {
            changePageFunc(1);
          }}
        >
          Acceuil
        </NavLink>
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          to="/produits"
          ref={addRefLink}
          onMouseEnter={(e) => hover(e)}
          onMouseLeave={hoverOff}
          onClick={() => {
            changePageFunc(2);
          }}
        >
          Shop
        </NavLink>
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          to="/à-propos"
          ref={addRefLink}
          onMouseEnter={(e) => hover(e)}
          onMouseLeave={hoverOff}
          onClick={() => {
            changePageFunc(3);
          }}
        >
          A propos
        </NavLink>
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          to="/contact"
          ref={addRefLink}
          onMouseEnter={(e) => hover(e)}
          onMouseLeave={hoverOff}
          onClick={() => {
            changePageFunc(4);
          }}
        >
          Contact
        </NavLink>

        <NavLink
          className="floating-cart"
          activeClassName="floating-cart-active"
          to="/panier"
          ref={addRefLink}
          onMouseEnter={(e) => hover(e)}
          onMouseLeave={hoverOff}
          onClick={() => changePageFunc(5)}
        >
          <ShoppingCart />
          <span className="nb-items">{totalItems}</span>
        </NavLink>
      </div>
      <div className="anim-active">
        <div className="anim-active-move" ref={anim}></div>
      </div>
      <div className="hamburger " onClick={openMenuFunc}>
        <span className="line1"></span>
        <span className="line2"></span>
        <span className="line3"></span>
      </div>
    </nav>
  );
};

export default Navbar;
