import React, { useEffect, useRef, useState } from "react";
import "./Navbar.scss";
import { NavLink, useHistory } from "react-router-dom";
import FloatingCart from "../FloatingCart/FloatingCart";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  /* States */

  const [activeAnim, setActiveAnim] = useState();
  const [stateAnim, setStateAnim] = useState(0);

  const { homePage } = useSelector((state) => ({
    ...state.appReducer,
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

  const openMenu = () => {
    dispatch({
      type: "OPENMENU",
    });
  };

  const homePageFalse = (bool) => {
    dispatch({
      type: "HOMEPAGE",
      payload: bool,
    });
  };

  /* History */
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname === "/") {
      homePageFalse(true);
      let ref1 = allLink.current[0].getBoundingClientRect();
      setActiveAnim(ref1.left + ref1.width / 2);
    }

    if (history.location.pathname === "/produits") {
      let ref2 = allLink.current[1].getBoundingClientRect();
      homePageFalse(false);
      setActiveAnim(ref2.left + ref2.width / 2);
    }
    if (history.location.pathname === "/à-propos") {
      let ref3 = allLink.current[2].getBoundingClientRect();
      homePageFalse(false);
      setActiveAnim(ref3.left + ref3.width / 2);
    }
    if (history.location.pathname === "/contact") {
      let ref4 = allLink.current[3].getBoundingClientRect();
      homePageFalse(false);
      setActiveAnim(ref4.left + ref4.width / 2);
    }
  }, [history.location.pathname]);

  useEffect(() => {
    anim.current.style.left = `${activeAnim}px  `;
  }, [activeAnim]);

  return (
    <nav className={homePage ? "home-page" : "navbar"}>
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
          onClick={() => {
            setStateAnim(1);
          }}
        >
          Acceuil
        </NavLink>
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          to="/produits"
          ref={addRefLink}
          onClick={() => {
            setStateAnim(2);
          }}
        >
          Shop
        </NavLink>
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          to="/à-propos"
          ref={addRefLink}
          onClick={() => {
            setStateAnim(3);
          }}
        >
          A propos
        </NavLink>
        <NavLink
          className="nav-page"
          activeClassName="active-nav-page"
          to="/contact"
          ref={addRefLink}
          onClick={() => {
            setStateAnim(4);
          }}
        >
          Contact
        </NavLink>

        <FloatingCart
          setStateAnim={setStateAnim}
          setActiveAnim={setActiveAnim}
        />
      </div>
      <div className="anim-active">
        <div className="anim-active-move" ref={anim}></div>
      </div>
      <div className="hamburger" onClick={openMenu}>
        <span className="line1"></span>
        <span className="line2"></span>
        <span className="line3"></span>
      </div>
    </nav>
  );
};

export default Navbar;
