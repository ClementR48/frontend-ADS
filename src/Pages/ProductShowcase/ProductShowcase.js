import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProducts } from "../../redux/reducer/productsReducer";

const ProductShowcase = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams();

  const { products } = useSelector((state) => ({
    ...state.productsReducer,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      fetch(dispatch(getProducts())).then(setLoading(true))
    }
  }, []);

  



 



  const indexProductClicked = products.findIndex(
    (obj) => obj.name.replace(/\s+/g, "").trim() === id
  );

  return <div>{ loading &&  <p>{console.log(products)}</p>}</div>;
};

export default ProductShowcase;
