import { motion } from "framer-motion";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./EmptyCart.scss";

const EmptyCart = ({ cartData }) => {
  
  

  let cursorRef = useRef();

  const mousePos = (e) => {
    cursorRef.current.setAttribute(
      "style",
      `top:${e.pageY - 40}px ; left:${e.pageX - 40}px; opacity:1`
    );
  };

  const mouseLeave = () => {
    cursorRef.current.setAttribute("style", "opacity: 0");
  };
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -500 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="cart-empty"
    >
      <div className="text-empty">
        <svg
          
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-6548.5 -1361.5 13910 2575"
          height="250px"
          width="1500px"
        >
          <path
            id="curve"
            d=" M -6547 -61.087 Q -4237.024 -2651.516 125.459 -75.839 Q 4487.942 2499.839 7360 -75.839 L 7360 -75.839 L 7360 -75.839"
            fill="none"
            stroke="none"
          />
          <text x="7%" filter="blur(10px)">
            <animate
              attributeName="x"
              from="100%"
              to="7%"
              begin="0s"
              dur="2s"
            />

            <textPath
              fontSize="500"
              fill="rgba(134, 90, 71, 1)"
              letterSpacing="350px"
              href="#curve"
            >
              VOTRE PANIER EST VIDE
            </textPath>
          </text>
        </svg>
      </div>
      <div className="carousel-empty" onMouseMove={mousePos} onMouseLeave={mouseLeave}>
        <div className="carousel-container">
          <div className="cursor" ref={cursorRef}>
            <span>Shop</span>
          </div>
          <Link to="/produits" className="image-container">
            {cartData[0].images.map((image, index) => (
              <img key={index} src={image} alt="" />
            ))}
          </Link>
          <Link to="/produits" className="image-container second">
            {cartData[0].images.map((image, index) => (
              <img key={index} src={image} alt="" />
            ))}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyCart;
