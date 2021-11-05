import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import productReducer from "../../../redux/reducer/productsReducer";
import "./ListProducts.scss";
import { ImageList, ImageListItem } from "@mui/material";

const ListProducts = () => {
  const { productsToShow, category } = useSelector((state) => ({
    ...state.productsReducer,
  }));

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
            <ImageListItem>
              <img
                srcSet={`${product.image.firstImage}`}
                src={`${product.image.firstImage}`}
                alt={product.name}
                loading="lazy"
              />
              
              <h1>{product.name}</h1>
            </ImageListItem>
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
            <div className="caption">

            </div>
            </div>
          ))}
        </div>
      );
    }
  }, [productsToShow]);

  return <>{list}</>;
};

export default ListProducts;
