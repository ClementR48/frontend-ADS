import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ListProducts.scss";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";


const ListProducts = () => {
  const { productsToShow } = useSelector((state) => ({
    ...state.productsReducer,
  }));




  const dispatch = useDispatch();
  const changePageFunc = (value) => {
    dispatch({
      type: "CHANGEPAGE",
      payload: value,
    });
  };

  /* Animation a l'appariton des items  */

  const allRef = useRef([]);

  const addRef = (el) => {
    if (el && !allRef.current.includes(el)) {
      allRef.current.push(el);
    }
  };

  const callbackFunction = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.filter = "blur(0)";
      } else {
        entry.target.style.opacity = 0;
        entry.target.style.filter = "blur(10px)";
      }
    });
  };

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: "0%",
      threshold: 0.3,
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
   
      allRef.current.forEach((ref) => {
        observer.observe(ref);
      });
    
    
  }, [options, allRef, productsToShow.length, productsToShow]);

  /* Animation au changement de la liste  */
  const [classGrid, setClassGrid] = useState("grid");
  const grid = useRef();
  

 

  /* Centrage des items quand il y a besoin */

  
  

  useEffect(() => {
    if (productsToShow !== undefined) {
      if (productsToShow.length <= 3) {
        setClassGrid("second-grid");
       
      } else {
        setClassGrid("grid");
      }
      
    }
  }, [productsToShow.length, productsToShow]);

  return (
    <>
      {productsToShow !== undefined ? (
        <>
          <div className={classGrid} ref={grid}>
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
                      <p>{item.price}???</p>
                    </div>
                    {item.quantity <= 0 ?<div className="sold-out">
                      <p>&Eacute;PUIS&Eacute;</p>
                    </div> : ""}
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
  );
};

export default ListProducts;
