import React, { useEffect, useRef, useState } from "react";
import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/General/Navbar/Navbar";
import { motion } from "framer-motion";
import ScrollToTop from "../../Components/ScrollToTop";
import { Parallax } from "react-parallax";
import Footer from "../../Components/General/Footer/Footer";
import { getCartData } from "../../redux/reducer/appReducer";
import Loader from "../../Components/Loader/Loader";
import EmptyCart from "../../Components/CartComponents/EmptyCart/EmptyCart";

const Cart = () => {
  const { cartData } = useSelector((state) => ({
    ...state.appReducer,
  }));


  const dispatch = useDispatch();
  useEffect(() => {
    if (cartData.length === 0) {
      dispatch(getCartData());
    }
  }, [dispatch, cartData.length]);

  const cartState = useSelector((state) => ({
    ...state.cartReducer,
  }));

  const productState = useSelector((state) => ({
    ...state.productsReducer,
  }));

  const input = useRef();

  const [productInfoQuantity, setProductInfoQuantity] = useState();

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
    if (
      event.target.value ===
      productState.productsBeforeBuy[productsBeforeBuyItem].quantity
    ) {
    }
  };

  const deleteProductFromCart = (id) => {
    const indexItem = cartState.cart.findIndex((obj) => obj.id === id);

    const objDeleted = {
      ...cartState.cart[indexItem],
    };
    dispatch({
      type: "DELETEITEM",
      payload: objDeleted,
    });
  };

  let totalPrice = 0;
  if (cartState.cart.length !== 0) {
    for (const item of cartState.cart) {
      const itemPrice = item.price * item.quantity;
      totalPrice += itemPrice;
    }
  }


  

  return (
    <>
      {cartData.length !== 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="cart"
        >
          <Navbar />
          <ScrollToTop />
          <Parallax
            bgImage={cartData[0].backgroundImage}
            bgImageAlt="arriere plan coloré"
            strength={1000}
            className="parallax"
          >
            <main className="container-cart">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Votre panier
              </motion.h2>
              {cartState.cart.length !== 0 ? (
                <motion.div className="cart-articles">
                  <ul>
                    {cartState.cart.map((item) => (
                      <li key={item.id}>
                        <div>
                          <h3>{item.name}</h3>
                          <img src={item.image.firstImage} alt="" />

                          <p>{item.price * item.quantity}€</p>
                        </div>
                        <div>
                          <input
                            ref={input}
                            type="number"
                            onChange={(e) => handleChange(e, item.id)}
                            min="0"
                            max={productInfoQuantity}
                            value={item.quantity}
                          ></input>
                        </div>
                        <button onClick={() => deleteProductFromCart(item.id)}>
                          SUP
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p>TOTAL : {totalPrice}€</p>
                  <button>Paiement POTO</button>
                </motion.div>
              ) : (
                <EmptyCart cartData={cartData}/>
              )}
            </main>
          </Parallax>
          <Footer footerColor={cartData[0].footerColor} />
        </motion.div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Cart;
