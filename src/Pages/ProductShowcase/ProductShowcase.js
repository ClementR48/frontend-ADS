import React, { useEffect, useRef, useState } from "react";
import "./ProductShowcase.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProducts } from "../../redux/reducer/productsReducer";
import Loader from "../../Components/Loader/Loader";
import { motion } from "framer-motion";
import ScrollToTop from "../../Components/ScrollToTop";
import Navbar from "../../Components/General/Navbar/Navbar";
import Footer from "../../Components/General/Footer/Footer";

const ProductShowcase = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const { products } = useSelector((state) => ({
    ...state.productsReducer,
  }));

  const changePageFunc = (value) => {
    dispatch({
      type: "CHANGEPAGE",
      payload: value,
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  const indexProductClicked = products.findIndex(
    (obj) => obj.name.replace(/\s+/g, "").trim() === id
  );

  const history = useHistory();

  const updateProduct = (e) => {
    setQuantity(Number(e.target.value));
  };

  let timerInfo;
  let display = true;

  const addToCart = (e) => {
    e.preventDefault();
    const productAdded = {
      ...products[indexProductClicked],
      quantity: quantity,
    };

    dispatch({
      type: "ADDITEM",
      payload: productAdded,
    });

    dispatch({
      type: "UPDATEPRODUCTFROMPRODUCT",
      payload: productAdded,
    });

    if (display) {
      display = false;
      timerInfo = setTimeout(() => {
        display = true;
      }, 1500);
    }

    setQuantity(1);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerInfo);
    };
  }, [timerInfo]);

  const buttonAddProduct = "Ajouter au panier";

  const textButtonLetters = buttonAddProduct.split("");

  let cursorRef = useRef();

  const mousepos = (e) => {
    cursorRef.current.setAttribute(
      "style",
      `top:${e.pageY - 40}px ; left:${e.pageX - 40}px; opacity:1`
    );
  };

  const mouseLeave = () => {
    cursorRef.current.setAttribute("style", "opacity: 0");
  };

  return (
    <>
      {products[indexProductClicked] === undefined ? (
        <Loader />
      ) : (
        <motion.div
          transition={{ delay: 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="product-showcase"
        >
          <Navbar />
          <ScrollToTop />
          <div className="product-showcase-container">
            <motion.div
              onMouseLeave={mouseLeave}
              onMouseMove={mousepos}
              className="product-left"
              initial={{ translateX: -300, opacity: 0 }}
              exit={{ translateX: -300, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div ref={cursorRef} className="cursor">
                <span>Scroll</span>
              </div>
              <img
                src={products[indexProductClicked].image.firstImage}
                alt="produit 1"
              />
              <img
                src={products[indexProductClicked].image.secondImage}
                alt="produit 2"
              />
              <img
                src={products[indexProductClicked].image.thirdImage}
                alt="produit 3"
              />
            </motion.div>
            <motion.div
              className="product-right"
              initial={{ translateX: 300, opacity: 0 }}
              exit={{ translateX: 300, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="title-product">
                {products[indexProductClicked].name}
              </h2>
              <div className="characteristic-product">
                <p className="description-product">
                  {products[indexProductClicked].description}
                </p>
                <div className="color">
                  <span>Couleurs: </span>
                  <ul>
                    <li key={products[indexProductClicked].color.firstColor}>
                      {`${products[indexProductClicked].color.firstColor},`}
                    </li>

                    {products[indexProductClicked].color.secondColor !== "" ? (
                      <li key={products[indexProductClicked].color.secondColor}>
                        {`${products[indexProductClicked].color.secondColor},`}
                      </li>
                    ) : (
                      ""
                    )}
                    {products[indexProductClicked].color.thirdColor !== "" ? (
                      <li key={products[indexProductClicked].color.thirdColor}>
                        {`${products[indexProductClicked].color.thirdColor}`}
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
                <div className="dimensions">
                  <p className="height">
                    <span>Hauteur:</span>
                    {products[indexProductClicked].dimensions.height}cm
                  </p>
                  <p className="width">
                    <span>Largeur:</span>
                    {products[indexProductClicked].dimensions.width}cm
                  </p>
                </div>
                <p className="price">{products[indexProductClicked].price}€</p>
              </div>

              {products[indexProductClicked].quantity !== 0 ? (
                <form className="add-container" onSubmit={addToCart}>
                  {products[indexProductClicked].quantity > 1 && (
                    <div className="input-container">
                      <input
                        type="number"
                        value={quantity}
                        onChange={updateProduct}
                        min="1"
                        max={products[indexProductClicked].quantity}
                      />
                    </div>
                  )}

                  <button className="checkout">
                    <div className="span-container s1">
                      {textButtonLetters.map((letter, index) => {
                        return (
                          <>
                            {letter !== " " ? (
                              <span
                                key={index}
                                style={{
                                  transitionDelay: ` ${0.05 * index}s`,
                                }}
                              >
                                {letter}
                              </span>
                            ) : (
                              <span
                                key={index}
                                style={{
                                  transitionDelay: ` ${0.05 * index}s`,
                                }}
                              >
                                &nbsp;
                              </span>
                            )}
                          </>
                        );
                      })}
                    </div>
                    <div className="span-container s2">
                      {textButtonLetters.map((letter, index) => {
                        return (
                          <>
                            {letter !== " " ? (
                              <span
                                key={index}
                                style={{
                                  transitionDelay: ` ${0.05 * index}s`,
                                }}
                              >
                                {letter}
                              </span>
                            ) : (
                              <span
                                key={index}
                                style={{
                                  transitionDelay: ` ${0.05 * index}s`,
                                }}
                              >
                                &nbsp;
                              </span>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </button>
                </form>
              ) : (
                <div className="sold-out-showcase">
                  <p>&Eacute;PUIS&Eacute;</p>
                </div>
              )}
              <div className="navigation">
                <button
                  onClick={() => {
                    changePageFunc();
                    history.push("/produits");
                  }}
                >
                  Shop
                </button>
              </div>
            </motion.div>
          </div>
          <Footer />
        </motion.div>
      )}
    </>
  );
};

export default ProductShowcase;
