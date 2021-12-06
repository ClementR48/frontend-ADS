import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Payment.scss";

const Payment = ({ adressCountry }) => {
  const { openPayment, cart } = useSelector((state) => ({
    ...state.cartReducer,
  }));
  console.log(adressCountry);
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const cartState = useSelector((state) => ({
    ...state.cartReducer,
  }));

  const dispatch = useDispatch();
  const previousPage = () => {
    dispatch({
      type: "OPENPAYMENT",
    });
  };

  let totalWeigh = [];
  for (let index = 0; index < cart.length; index++) {
    totalWeigh.push(cart[index].price);
  }
  const sumWeight = totalWeigh.reduce(add, 0);

  function add(acc, a) {
    return acc + a;
  }

  useEffect(() => {
    if (adressCountry === "France") {
      if (sumWeight < 250) {
        setDeliveryPrice(4.95);
      } else if (sumWeight < 500) {
        setDeliveryPrice(6.55);
      } else if (sumWeight < 750) {
        setDeliveryPrice(7.45);
      } else if (sumWeight < 1000) {
        setDeliveryPrice(8.1);
      } else if (sumWeight < 2000) {
        setDeliveryPrice(9.35);
      } else if (sumWeight < 5000) {
        setDeliveryPrice(14.35);
      } else if (sumWeight < 10000) {
        setDeliveryPrice(20.85);
      } else if (sumWeight < 15000) {
        setDeliveryPrice(26.4);
      } else if (sumWeight < 30000) {
        setDeliveryPrice(32.7);
      } else {
        setDeliveryPrice(40);
      }
    }else {
      setDeliveryPrice(20)
    }
  }, [sumWeight, adressCountry]);

  let totalPrice = 0;
  if (cartState.cart.length !== 0) {
    for (const item of cartState.cart) {
      const itemPrice = item.price * item.quantity;
      totalPrice += itemPrice;
    }
  }
  console.log(deliveryPrice);
  return (
    <div className={openPayment ? "payment active" : "payment"}>
      {deliveryPrice}
      totalPrice : {deliveryPrice + totalPrice}
      <button type="button" onClick={previousPage}>
        prev
      </button>
    </div>
  );
};

export default Payment;
