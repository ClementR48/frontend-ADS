import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const cartState = useSelector((state) => ({
    ...state.cartReducer,
  }));

  const productState = useSelector((state) => ({
    ...state.productsReducer
  }))

  const handleChange = (event, id) => {
    const indexItem = cartState.cart.findIndex((obj) => obj.id === id);
    const productItem = productState.products.findIndex((obj) => obj.id === id);


    const objUpdated = {
      ...cartState.cart[indexItem],
      quantity:  Number(event.target.value),
    };

    dispatch({
      type: "UPDATEITEM",
      payload: objUpdated,
    });

    if(event.target.value === "0") {
      deleteProductFromCart(id)
    }



  };

  const deleteProductFromCart = (id) => {
    const indexItem = cartState.cart.findIndex((obj) => obj.id === id)

    const objDeleted = {
      ...cartState.cart[indexItem]
    }
    dispatch({
      type: "DELETEITEM",
      payload: objDeleted
    })
  }

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
                type="number"
                onChange={(e) => handleChange(e, item.id)}
                min="0"
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
