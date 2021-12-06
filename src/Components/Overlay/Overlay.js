import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import "./Overlay.scss";

const Overlay = () => {
  const dispatch = useDispatch();
  const backToSite = () => {
    dispatch({
      type: "OPENCHECKOUT",
    });
  };

  let cursorRef = useRef();

  const mousePos = (e) => {
    
    cursorRef.current.setAttribute(
      "style",
      `top:${e.clientY - 40}px ; left:${e.clientX - 40}px; opacity:1`
    );
  };

  const mouseLeave = () => {
    cursorRef.current.setAttribute("style", "opacity: 0");
  };
  return (
    <motion.div
    onMouseMove={mousePos}
    onMouseLeave={mouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="overlay"
      onClick={backToSite}
    >
      <div className="cursor" ref={cursorRef}><div className="container-cursor">Site</div></div>
    </motion.div>
  );
};

export default Overlay;
