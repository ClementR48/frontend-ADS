import React, { useEffect, useRef, useState } from "react";
import "./Navbar.scss";
import { NavLink, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "react-feather";
import { motion } from "framer-motion";

const Navbar = ({ isHomePage, changeNavScroll }) => {
  /* States */

  const [activeAnim, setActiveAnim] = useState();
  const [opacityAnim, setOpacityAnim] = useState(1)

  /* Selector  */

  const { changePage, openMenu } = useSelector((state) => ({
    ...state.appReducer,
  }));

  

  const shoppingCart = useSelector((state) => ({
    ...state.cartReducer,
  }));

  /* Ref */

  const allLink = useRef([]);
  const anim = useRef();

  const addRefLink = (el) => {
    if (el && !allLink.current.includes(el)) {
      allLink.current.push(el);
    }
  };

  /* Dispatch */

  const dispatch = useDispatch();

  const openMenuFunc = () => {
    dispatch({
      type: "OPENMENU",
    });
  };

  const changePageFunc = () => {
    dispatch({
      type: "CHANGEPAGE",
    });
  };

  /* History */
  const history = useHistory();

  /* Animation au enter du hover */

  const hover = (e) => {
    if (e.target.innerText === "Acceuil") {
      setOpacityAnim(1)
      let ref1 = allLink.current[0].getBoundingClientRect();
      setActiveAnim(ref1.left + ref1.width / 2);
    }
    if (e.target.innerText === "Shop") {
      setOpacityAnim(1)
      let ref2 = allLink.current[1].getBoundingClientRect();
      setActiveAnim(ref2.left + ref2.width / 2);
    }
    if (e.target.innerText === "A propos") {
      setOpacityAnim(1)
      let ref3 = allLink.current[2].getBoundingClientRect();
      setActiveAnim(ref3.left + ref3.width / 2);
    }
    if (e.target.innerText === "Contact") {
      setOpacityAnim(1)
      let ref4 = allLink.current[3].getBoundingClientRect();
      setActiveAnim(ref4.left + ref4.width / 2);
    }

    if (e.target.className === "floating-cart") {
      setOpacityAnim(1)
      let ref5 = allLink.current[4].getBoundingClientRect();
      setActiveAnim(ref5.left + ref5.width / 2);
    }
  };

  /* Animation au leave du hover */

  const hoverOff = () => {
    if (history.location.pathname === "/") {
      let ref1 = allLink.current[0].getBoundingClientRect();
      setActiveAnim(ref1.left + ref1.width / 2);
    }

    if (history.location.pathname === "/produits") {
      let ref2 = allLink.current[1].getBoundingClientRect();

      setActiveAnim(ref2.left + ref2.width / 2);
    }
    if (history.location.pathname === "/??-propos") {
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

    if (history.location.pathname.startsWith("/produits/")) {
      setOpacityAnim(0)
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
    if (history.location.pathname === "/??-propos") {
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
    if (history.location.pathname.startsWith("/produits/")) {
      setOpacityAnim(0)
      
    }
  }, [history.location.pathname, changePage]);

  

  useEffect(() => {
    anim.current.style.left = `${activeAnim}px  `;
    anim.current.style.opacity = opacityAnim;
  }, [activeAnim, opacityAnim]);

  /* dynamisation de la classe de la nav et du logo a afficher en fonction de la page */

  let classe = "";
  let logoNav = "";

  if(openMenu){
    if (isHomePage) {
    
      if (changeNavScroll) {
        classe = "navbar active-hamburger";
        logoNav = "logoRose";
      } else {
        classe = "navbar active-hamburger";
        logoNav = "logoRose";
      }
    } else {
      classe = "navbar active-hamburger";
      logoNav = "logoRose";
    }
  }else {
    if (isHomePage) {
    
      if (changeNavScroll) {
        classe = "navbar";
        logoNav = "logoRose";
      } else {
        classe = "home-page ";
        logoNav = "logoBlanc";
      }
    } else {
      classe = "navbar";
      logoNav = "logoRose";
    }
  }
  

  /* Nombre items dans le cart */

  let totalItems = 0;
  for (const item of shoppingCart.cart) {
    totalItems += item.quantity;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={classe}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/${logoNav}.png`}
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
            changePageFunc();
          }}
        >
          Acceuil
        </NavLink>
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          to="/produits"
          exact
          ref={addRefLink}
          onMouseEnter={(e) => hover(e)}
          onMouseLeave={hoverOff}
          onClick={() => {
            changePageFunc();
          }}
        >
          Shop
        </NavLink>
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          to="/??-propos"
          ref={addRefLink}
          onMouseEnter={(e) => hover(e)}
          onMouseLeave={hoverOff}
          onClick={() => {
            changePageFunc();
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
            changePageFunc();
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
          onClick={() => changePageFunc()}
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
    </motion.nav>
  );
};

export default Navbar;
