import React, { useEffect } from "react";
import { getProducts } from "../../redux/reducer/productsReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
    <ul>
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
              {product.name}
            </Link>
          
        );
      })}
    </ul>
  );
};

export default Products;
