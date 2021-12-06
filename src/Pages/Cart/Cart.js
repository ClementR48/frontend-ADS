import React, { useEffect} from "react";
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
import FullCart from "../../Components/CartComponents/FullCart/FullCart";
import { getProducts } from "../../redux/reducer/productsReducer";

const Cart = () => {
  const { cartData } = useSelector((state) => ({
    ...state.appReducer,
  }));
  const { products } = useSelector((state) => ({
    ...state.productsReducer,
  }));
  const { openCheckout } = useSelector((state) => ({
    ...state.cartReducer,
  }));


  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  
 
  
  useEffect(() => {
    if (cartData.length === 0) {
      dispatch(getCartData());
    }
  }, [dispatch, cartData.length]);

  const cartState = useSelector((state) => ({
    ...state.cartReducer,
  }));

  return (
    <>
      {cartData.length !== 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
          className={openCheckout ? "cart active" : "cart"}
        >
          <ScrollToTop />
          <Parallax
            bgImage={cartData[0].backgroundImage}
            bgImageAlt="arriere plan coloré"
            strength={1000}
            className="parallax"
          >
            <Navbar />
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
                <FullCart />
              ) : (
                <EmptyCart cartData={cartData} />
              )}
            </main>
            <Footer footerColor={cartData[0].footerColor} />
          </Parallax>
        </motion.div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Cart;
