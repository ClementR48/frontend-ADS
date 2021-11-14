import React, { useEffect, useState } from "react";
import "./Products.scss";
import { getProducts } from "../../redux/reducer/productsReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Categories from "../../Components/ProductsComponents/Categories/Categories";
import ListProducts from "../../Components/ProductsComponents/ListProducts/ListProducts";
import Loader from "../../Components/Loader/Loader";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import ScrollToTop from "../../Components/ScrollToTop";


const Products = () => {
  const { products } = useSelector((state) => ({
    ...state.productsReducer,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, []);

  return (
    <motion.div
      className="products"
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      
    >
         <Parallax
      bgImage={`/assets/images/background/bgProducts.png`}
      bgImageAlt="arriere plan coloré"
      strength={1000}
    >
      {products.length !== 0 ? (
        <>
          <ScrollToTop/>
          <motion.div
            transition={{ duration:1}}
            initial={{
              translateY: -100,
              opacity: 0,
            }}
            animate={{
              translateY: 0,
              opacity: 1,
            }}
            exit={{
              translateY: -100,
              opacity: 0,
            }}
          >
            <Categories />
          </motion.div>

          <motion.div
            transition={{ duration:1}}
            initial={{
              translateY: 100,
              opacity: 0,
            }}
            animate={{
              translateY: 0,
              opacity: 1,
            }}
            exit={{
              translateY: 100,
              opacity: 0,
            }}
            
          >
            <ListProducts  />
          </motion.div>
        </>
      ) : (
        <Loader />
      )}
      </Parallax>
    </motion.div>
  );
};

export default Products;
