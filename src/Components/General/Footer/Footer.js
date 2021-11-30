import React from "react";
import { motion } from "framer-motion";

import "./Footer.scss";
import { Link } from "react-router-dom";
import { Instagram } from "react-feather";

const Footer = ({ footerColor }) => {
  return (
    <motion.footer
      initial={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: 100, opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        background: `${footerColor ? footerColor : "rgb(235,244,205)"}`,
      }}
      className="footer"
    >
      <img className="logo1" src="/assets/images/logoRose.png" alt="logo"></img>
      <ul className="list-contact">
        <li>
          <Link className="footer-contact" to="/contact">
            Me contacter
          </Link>
        </li>
        <li>
          
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/mariefekceramics/"
          >
           <Instagram size = '20'/>:  @mariefekceramics
          </a>
        </li>
        <li>
          marie.fekroun@gmail.com
        </li>
      </ul>
      <img className='logo2' src="/assets/images/logoRose.png" alt="logo"></img>
    </motion.footer>
  );
};

export default Footer;
