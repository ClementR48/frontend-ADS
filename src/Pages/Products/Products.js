import React, { useEffect, useState } from "react";
import "./Products.scss";
import { getProducts } from "../../redux/reducer/productsReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Categories from "../../Components/ProductsComponents/Categories/Categories";
import ListProducts from "../../Components/ProductsComponents/ListProducts/ListProducts";
import Loader from "../../Components/Loader/Loader";
import { motion, useMotionValue } from "framer-motion";

const Products = () => {

  const x = useMotionValue(0)

  x.getVelocity(100)
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
    initial={{ opacity: 0, translateX: 100}}
    animate={{ opacity: 1 , translateX: 0}}
    exit={{ opacity: 0 }}
  >
    <div className="products">
      {products.length !== 0 ? <> 
        <Categories />
        <ListProducts />
      </> : <Loader />}
     
     
    </div>
    </motion.div>
  );
};

export default Products;
