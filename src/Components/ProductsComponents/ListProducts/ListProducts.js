import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ListProducts.scss";
import { Grid, Item, ImageList, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { motion } from "framer-motion";
import gsap from "gsap/all";
import all from "gsap/all";

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

  const allRef = useRef([]);
  const ref1 = useRef();

  const addRef = (el) => {
    if (el && !allRef.current.includes(el)) {
      allRef.current.push(el);
    }
  };

  const callbackFunction = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
      }
    });
  };

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    
    allRef.current.forEach((ref) => {
      observer.observe(ref);
    });
    console.log(allRef.current);
    if(allRef.current == ''){
      gsap.to('.item', {
        opacity: 1
      })
    }

  }, [options, allRef]);

  useEffect(() => {
    gsap.fromTo(
      ".grid",
      {
        opacity: 0,
        y: 100,
      },
      {
        duration: 1,

        opacity: 1,
        y: 0,
      }
    );
  }, [productsToShow]);

  return (
    <>
      {productsToShow !== undefined ? (
        <>
          <div className="grid" ref={ref1}>
            {productsToShow.map((item) => {
              return (
                <div key={item.id} className="item" ref={addRef}>
                  <Link
                    className="item-link"
                    key={item.id}
                    onClick={() => {
                      changePageFunc();
                    }}
                    to={`/produits/${item.name.replace(/\s+/g, "").trim()}`}
                  >
                    <img
                      src={item.image.firstImage}
                      loading="lazy"
                      alt="vase"
                    />
                    <div className="caption">
                      <h3>{item.name}</h3>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
    /*     <>
      {productsToShow === undefined ? (
        <Loader />
      ) : (
        <>
          {category === "tout" ? (
            <div className="list-container-first">
              {productsToShow.map((product) => (
                
                  
                    <Link
                      className="items"
                      key={product.id}
                      onClick={() => {
                        changePageFunc();
                      }}
                      to={`/produits/${product.name
                        .replace(/\s+/g, "")
                        .trim()}`}
                    >
                      <img
                        
                        src={`${product.image.firstImage}`}
                        alt={product.name}
                        loading="lazy"
                      />

                      <h1>{product.name}</h1>
                    </Link>
                  
                
              ))}
              </div>
          ) : (
            <div className="list-container">
              {productsToShow.map((product) => (
                <div className="product-container">
                  <div className="image-container">
                    <img
                      src={product.image.firstImage}
                      alt={product.name}
                    ></img>
                  </div>
                  <div className="caption"></div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </> */
  );
};

export default ListProducts;
