import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productReducer from "../../../redux/reducer/productsReducer";
import "./ListProducts.scss";
import { ImageList, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

const ListProducts = () => {
  const { productsToShow, category } = useSelector((state) => ({
    ...state.productsReducer,
  }));

  const dispatch = useDispatch();

  const changePageFunc = (value) => {
    dispatch({
      type: "CHANGEPAGE",
      payload: value,
    });
  };

  const [list, setList] = useState();

  useEffect(() => {
    if (category === "tout") {
      setList(
        <ImageList
          className="list-products"
          variant="masonry"
          cols={3}
          gap={100}
        >
          {productsToShow.map((product) => (
            <Link
              key={product.id}
              onClick={() => {
                changePageFunc(20);
              }}
              to={`/produits/${product.name.replace(/\s+/g, "").trim()}`}
            >
              <ImageListItem>
                <img
                  srcSet={`${product.image.firstImage}`}
                  src={`${product.image.firstImage}`}
                  alt={product.name}
                  loading="lazy"
                />

                <h1>{product.name}</h1>
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      );
    } else {
      setList(
        <div className="list-container">
          {productsToShow.map((product) => (
            <div className="product-container">
              <div className="image-container">
                <img src={product.image.firstImage} alt={product.name}></img>
              </div>
              <div className="caption"></div>
            </div>
          ))}
        </div>
      );
    }
  }, [productsToShow]);

  useEffect(() => {
    console.log(category);
    console.log(productsToShow);
  }, []);
  return <>{productsToShow === undefined ? <Loader /> : list}</>;
};

export default ListProducts;
