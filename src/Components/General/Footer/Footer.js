import React from "react";
import { motion } from "framer-motion";

import "./Footer.scss";

const Footer = ({footerColor}) => {
  return (
    <motion.footer
      initial={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: 100, opacity: 0 }}
      transition={{duration: 1}}
      style={{ background: `${footerColor ? footerColor : 'rgb(235,244,205)'}` }}
      className="footer"
    >
      <img src="/assets/images/logoRose.png" alt="logo"></img>
      <ul className="listSocialNetwork">
        <li>
          <span>Email:</span> atelierDelSol@gmail.com
        </li>
        <li>
          <span>Instagram:</span> @atelierDelSol
        </li>
        <li>
          <span>Facebook:</span> Atelier Del Sol
        </li>
      </ul>
    </motion.footer>
  );
};

export default Footer;
