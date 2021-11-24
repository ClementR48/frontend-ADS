import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Trash } from "react-feather";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./FullCart.scss";

const FullCart = () => {
  const productState = useSelector((state) => ({
    ...state.productsReducer,
  }));
  const cartState = useSelector((state) => ({
    ...state.cartReducer,
  }));

  const [productInfoQuantity, setProductInfoQuantity] = useState();

  const dispatch = useDispatch();

  const deleteProductFromCart = (id) => {
    const indexItem = cartState.cart.findIndex((obj) => obj.id === id);
    const productItem = productState.products.findIndex((obj) => obj.id === id);

    const objDeleted = {
      ...cartState.cart[indexItem],
    };
    const productDeleted = {
      ...productState.products[productItem],
      quantity: 0,
    };
    dispatch({
      type: "DELETEITEM",
      payload: objDeleted,
    });
    dispatch({
      type: "UPDATEPRODUCTFROMCART",
      payload: productDeleted,
    });
  };

  let totalPrice = 0;
  if (cartState.cart.length !== 0) {
    for (const item of cartState.cart) {
      const itemPrice = item.price * item.quantity;
      totalPrice += itemPrice;
    }
  }
  const handleChange = (event, id) => {
    const indexItem = cartState.cart.findIndex((obj) => obj.id === id);
    const productItem = productState.products.findIndex((obj) => obj.id === id);
    const productsBeforeBuyItem = productState.productsBeforeBuy.findIndex(
      (obj) => obj.id === id
    );
    setProductInfoQuantity(
      productState.productsBeforeBuy[productsBeforeBuyItem].quantity
    );

    const objUpdated = {
      ...cartState.cart[indexItem],
      quantity: Number(event.target.value),
    };

    dispatch({
      type: "UPDATEITEM",
      payload: objUpdated,
    });

    const productUpdate = {
      ...productState.products[productItem],
      quantity: Number(event.target.value),
    };

    dispatch({
      type: "UPDATEPRODUCTFROMCART",
      payload: productUpdate,
    });

    if (event.target.value == 0) {
      deleteProductFromCart(id);
    }
  };

  const textButton = "Paiement";
  
  const textButtonLetters = textButton.split("");

  

  return (
    <motion.div className="cart-articles">
      <ul>
        <li>
          <img src="/assets/images/logoBlanc.png" alt="" />
          <a href="">
            <h3>Vase a anse</h3>
          </a>
          <p>80€</p>

          <p>
            Quantité :
            <input
              type="number"
              min="0"
              max={productInfoQuantity}
              value="2"
            ></input>
          </p>
          <div className="trash">
            <Trash />
          </div>
        </li>
        <li>
          <img src="/assets/images/logoBlanc.png" alt="" />
          <h3>Vase a anse</h3>
          <p>80€</p>

          <p>
            Quantité :
            <input
              type="number"
              min="0"
              max={productInfoQuantity}
              value="2"
            ></input>
          </p>

          <Trash />
        </li>
        <li>
          <img src="/assets/images/logoBlanc.png" alt="" />
          <h3>Vase a anse</h3>
          <p>80€</p>

          <p>
            Quantité :
            <input
              type="number"
              min="0"
              max={productInfoQuantity}
              value="2"
            ></input>
          </p>

          <Trash />
        </li>
        <li>
          <img src="/assets/images/logoBlanc.png" alt="" />
          <h3>Vase a anse</h3>
          <p>80€</p>
          <p>Quantité: 2</p>
          <Trash />
        </li>
        {cartState.cart.map((item) => (
          <li key={item.id}>
            <img src={item.image.firstImage} alt="" />
            <Link to={`/produits/${item.name.replace(/\s+/g, "").trim()}`}>
              <h3>{item.name}</h3>
            </Link>
            <p>{item.price * item.quantity}€</p>
            <p>
              Quantité :
              <input
                type="number"
                onChange={(e) => {
                  handleChange(e, item.id);
                }}
                min="0"
                max={productInfoQuantity}
                value={item.quantity}
              ></input>
            </p>

            <Trash onClick={() => deleteProductFromCart(item.id)} />
          </li>
        ))}
      </ul>
      <div className="total-information">
        <p>Sous-total : {totalPrice}€</p>
        <div className="checkout">
          <div className="span-container s1">
            {textButtonLetters.map((letter, index) => {
              return (
                <span style={{ transitionDelay: ` ${0.07 * index}s` }}>
                  {letter}
                </span>
              );
            })}
          </div>
          <div className="span-container s2">
            {textButtonLetters.map((letter, index) => {
              return (
                <span style={{ transitionDelay: ` ${0.07 * index}s` }}>
                  {letter}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FullCart;
