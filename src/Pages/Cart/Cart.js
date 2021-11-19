import React, { useRef, useState } from "react";
import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/General/Navbar/Navbar";

const Cart = () => {
  const cartState = useSelector((state) => ({
    ...state.cartReducer,
  }));

  const productState = useSelector((state) => ({
    ...state.productsReducer,
  }));

 const input = useRef();

  const [productInfoQuantity, setProductInfoQuantity] = useState();

  const handleChange = (event, id) => {
    const indexItem = cartState.cart.findIndex((obj) => obj.id === id);
    const productItem = productState.products.findIndex((obj) => obj.id === id);
    const productsBeforeBuyItem = productState.productsBeforeBuy.findIndex(
      (obj) => obj.id === id
    );
    setProductInfoQuantity(
      productState.productsBeforeBuy[productsBeforeBuyItem].quantity
    );

    const objUpdated = {
      ...cartState.cart[indexItem],
      quantity: Number(event.target.value),
    };

    dispatch({
      type: "UPDATEITEM",
      payload: objUpdated,
    });

    const productUpdate = {
      ...productState.products[productItem],
      quantity: Number(event.target.value),
    };

    dispatch({
      type: "UPDATEPRODUCTFROMCART",
      payload: productUpdate,
    });

    if (event.target.value == "0") {
      deleteProductFromCart(id);
    }
    if(event.target.value === productState.productsBeforeBuy[productsBeforeBuyItem].quantity){
      
    }
  };

  const deleteProductFromCart = (id) => {
    const indexItem = cartState.cart.findIndex((obj) => obj.id === id);

    const objDeleted = {
      ...cartState.cart[indexItem],
    };
    dispatch({
      type: "DELETEITEM",
      payload: objDeleted,
    });
  };

  const dispatch = useDispatch();

  let totalPrice = 0;
  if (cartState.cart.length !== 0) {
    for (const item of cartState.cart) {
      const itemPrice = item.price * item.quantity;
      totalPrice += itemPrice;
    }
  }

 

  return (
    <div>
      <Navbar/>
      <ul>
        {cartState.cart.map((item) => (
          <li key={item.id}>
            <div>
              <h2>{item.name}</h2>
              <img src={item.image.firstImage} alt="tac" />

              <p>{item.price * item.quantity}€</p>
            </div>
            <div>
              <input
                ref={input}
                type="number"
                onChange={(e) => handleChange(e, item.id)}
                min="0"
                max= {productInfoQuantity}
                value={item.quantity}
              ></input>
            </div>
            <button onClick={() => deleteProductFromCart(item.id)}>SUP</button>
          </li>
        ))}
      </ul>
      <p>TOTAL : {totalPrice}€</p>
      <button>Paiement POTO</button>
    </div>
  );
};

export default Cart;
