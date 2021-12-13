import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Trash } from "react-feather";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./FullCart.scss";
import { getProducts } from "../../../redux/reducer/productsReducer";
import Checkout from "../Checkout/Checkout";



const FullCart = () => {
  const productState = useSelector((state) => ({
    ...state.productsReducer,
  }));
  const cartState = useSelector((state) => ({
    ...state.cartReducer,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (productState.productsBeforeBuy.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, productState.productsBeforeBuy.length]);

 

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

    if (event.target.value === 0) {
      deleteProductFromCart(id);
    }
  };

  const textButton = "Paiement";

  const textButtonLetters = textButton.split("");

const maxValueInput = (id) => {
    if (productState.productsBeforeBuy.length !== 0) {
      const productFiltered = productState.productsBeforeBuy.filter(
        (product) => product.id === id
      );
      return productFiltered[0].quantity;
    } 
  }; 

   const checkoutOpen = () => {
     console.log(cartState.openCheckout);
    dispatch({
      type: 'OPENCHECKOUT'
    })
  } 

  return (
    <>
    
      <motion.div
        initial={{ opacity: 0, translateX: -100 }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -100 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="cart-articles"
      >
      
        <ul>
          {cartState.cart.map((item) => (
            <>
              <li key={item.id}>
                <div className="image-cart">
                  <img src={item.image.firstImage} alt="" />
                </div>
                <div className="info-product">
                  <Link
                    to={`/produits/${item.name.replace(/\s+/g, "").trim()}`}
                  >
                    <h3>{item.name}</h3>
                  </Link>
                  <p>{item.price * item.quantity}€</p>

                  <p>
                    <input
                      data-id={item.id}
                      type="number"
                      onChange={(e) => {
                        handleChange(e, item.id);
                      }}
                      min="0"
                      max={maxValueInput(item.id)}  
                      value={item.quantity}
                    ></input>
                  </p>

                  <div className="trash">
                    <Trash onClick={() => deleteProductFromCart(item.id)} />
                  </div>
                </div>
              </li>
            </>
          ))}
        </ul>
        <div className="total-information">
          <p>Sous-total : {totalPrice}€</p>
          <div className="checkout" onClick={() => checkoutOpen()} >
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
      
    </>
  );
};

export default FullCart;
