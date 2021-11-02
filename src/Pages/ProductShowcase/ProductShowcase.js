import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProducts } from "../../redux/reducer/productsReducer";

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
      payload: productAdded
    }) 

    setQuantity(1)


  };
  useEffect(() => {
    

  }, [products])

  return (
    <div>
      {products[indexProductClicked] === undefined ? (
        <p>Loading</p>
      ) : (
        <div>
          <p>{products[indexProductClicked].name}</p>
          <form onSubmit={addToCart}>
            <input
              type="number"
              value={quantity}
              onChange={updateProduct}
              min="0"
              max={products[indexProductClicked].quantity}
            />
            <button>Ajouter au panier</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;
