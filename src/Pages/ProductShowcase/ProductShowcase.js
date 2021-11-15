import React, { useEffect, useState } from "react";
import "./ProductShowcase.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProducts } from "../../redux/reducer/productsReducer";
import Loader from "../../Components/Loader/Loader";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import ScrollToTop from "../../Components/ScrollToTop";

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
  }, []);

  const indexProductClicked = products.findIndex(
    (obj) => obj.name.replace(/\s+/g, "").trim() === id
  );

  const history = useHistory();

  const updateProduct = (e) => {
    setQuantity(Number(e.target.value));
  };

  let timerInfo;
  let display = true;
  const [textButton, setTextButton] = useState("Ajouter au panier");

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

    setTextButton("attrapey");

    if (display) {
      display = false;
      timerInfo = setTimeout(() => {
        setTextButton("Ajouter au panier");

        display = true;
      }, 1500);
    }

    setQuantity(1);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerInfo);
    };
  }, []);

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
        >
          <Parallax
            bgImage={`/assets/images/background/bgProducts.png`}
            bgImageAlt="arriere plan coloré"
            strength={1000}
          >
            <div className="product-showcase">
              <ScrollToTop />
              <motion.div
                className="product-left"
                initial={{ translateX: -300, opacity: 0 }}
                exit={{ translateX: -300, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <p>scroll</p>
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
                <div className="general-information">
                  <h2 className="title-product">
                    {products[indexProductClicked].name}
                  </h2>
                  <p className="description-product">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Amet veniam ipsam nostrum dolorum. Quisquam sint hic
                    veritatis aspernatur ab quia neque vitae pariatur
                    repudiandae magni odio possimus numquam nam sit, porro
                    delectus? Voluptatibus modi impedit ipsa, laborum ratione
                    molestias sunt.
                    {products[indexProductClicked].description}
                  </p>
                  <div className="characteristic-product">
                    <div className="color">
                      <span>Couleurs: </span>
                      <ul>
                        <li>
                          {products[indexProductClicked].color.firstColor}
                        </li>
                        <li>rouge</li>
                        <li>rouge</li>

                        {products[indexProductClicked].color.secondColor !==
                        "" ? (
                          <li>
                            {products[indexProductClicked].color.secondColor}
                          </li>
                        ) : (
                          ""
                        )}
                        {products[indexProductClicked].color.thirdColor !==
                        "" ? (
                          <li>
                            {products[indexProductClicked].color.thirdColor}
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                    <div className="dimensions">
                      <p className="width">
                        <span>Largeur:</span>
                        {products[indexProductClicked].dimensions.width}cm
                      </p>
                      <p className="height">
                        <span>Hauteur:</span>
                        {products[indexProductClicked].dimensions.height}cm
                      </p>
                    </div>
                  </div>

                  <p className="price">
                    <span>Prix:</span>
                    {products[indexProductClicked].price}€
                  </p>
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
                    <button>
                      <span>{textButton}</span>
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
          </Parallax>
        </motion.div>
      )}
    </>
  );
};

export default ProductShowcase;
