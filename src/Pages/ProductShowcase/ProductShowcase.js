import React, { useEffect, useState } from "react";
import "./ProductShowcase.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProducts } from "../../redux/reducer/productsReducer";
import Loader from "../../Components/Loader/Loader";

const ProductShowcase = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const { products } = useSelector((state) => ({
    ...state.productsReducer,
  }));

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
      type: "UPDATEPRODUCT",
      payload: productAdded,
    });

    setQuantity(1);
  };
  useEffect(() => {}, [products]);

  return (
    <>
      {products[indexProductClicked] === undefined ? (
        <Loader />
      ) : (
        <div className="product-showcase">
          <div className="product-left">
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
          </div>
          <div className="product-right">
            <div className="general-information">
              <h2 className="title-product">
                {products[indexProductClicked].name}
              </h2>
              <p className="description-product">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
                veniam ipsam nostrum dolorum. Quisquam sint hic veritatis
                aspernatur ab quia neque vitae pariatur repudiandae magni odio
                possimus numquam nam sit, porro delectus? Voluptatibus modi
                impedit ipsa, laborum ratione molestias sunt.
                {products[indexProductClicked].description}
              </p>
              <div className="characteristic-product">
                <div className="color">
                  <ul>
                    <span>Couleurs: </span>
                    <li>{products[indexProductClicked].color.firstColor}</li>
                    <li>rouge</li>
                    <li>rouge</li>

                    <li>{products[indexProductClicked].color.secondColor}</li>
                    <li>{products[indexProductClicked].color.thirdColor}</li>
                  </ul>
                </div>
                <div className="dimensions">
                  <p className="width">
                    {" "}
                    <span>Largeur:</span>{" "}
                    {products[indexProductClicked].dimensions.width}
                  </p>
                  <p className="height">
                    <span>Hauteur:</span>{" "}
                    {products[indexProductClicked].dimensions.height}
                  </p>
                </div>
              </div>

              <p className="price">
                <span>Prix:</span>
                {products[indexProductClicked].price}€
              </p>
            </div>

            <form className="add-container" onSubmit={addToCart}>
              {products[indexProductClicked].quantity > 1 && (
                <input
                  type="number"
                  value={quantity}
                  onChange={updateProduct}
                  min="1"
                  max={products[indexProductClicked].quantity}
                />
              )}
              <button>Ajouter au panier</button>
            </form>
            <div className="navigation">
              <button onClick={() => history.push("/produits")}>
                back to shop
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductShowcase;
