import React, { useEffect, useState } from "react";
import "./Products.scss";
import { getProducts } from "../../redux/reducer/productsReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Categories from "../../Components/ProductsComponents/Categories/Categories";
import ListProducts from "../../Components/ProductsComponents/ListProducts/ListProducts";
import Loader from "../../Components/Loader/Loader";

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
    <div className="products">
      {products.length !== 0 ? <> 
        <Categories />
        <ListProducts />
      </> : <Loader />}
     
      {/* <ul>
        {products.map((product) => {
          return (
            <Link
              to={{
                pathname: `/produits/${product.name
                  .replace(/\s+/g, "")
                  .trim()}`,
              }}
              key={product.id}
            >
            product.name
            </Link>
          );
        })}
      </ul> */}
    </div>
  );
};

export default Products;
