import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import "./EmptyCart.scss";

const EmptyCart = ({ cartData }) => {
  const spliteText = "Votre paniier est vide";
  const newText = spliteText.split(" ");
  return (
    <motion.div className="cart-empty">
      <div className="text-empty">
        {newText.map((word, index) => (
          
          <motion.p key={index}>{word}</motion.p>
        ))}
      </div>
      <div  className="carousel-empty">
        <div className="carousel-container">
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
