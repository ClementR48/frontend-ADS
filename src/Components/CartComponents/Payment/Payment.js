import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Payment.scss";
import ReactDOM from "react-dom";
import emailjs from "emailjs-com";
import { db } from "../../../utils/firebaseConfig";
import { updateDoc, doc, addDoc, collection } from "firebase/firestore";
import { ArrowLeft } from "react-feather";

const Payment = ({
  adressStreet,
  adressCity,
  adressCountry,
  nameUser,
  firstNameUser,
  emailUser,
}) => {
  const PayPalButton = window.paypal.Buttons.driver("react", {
    React,
    ReactDOM,
  });

  const paymentCollectionRef = collection(db, "Payment");
  const addUserInPayment = async () => {
    const newField = {
      firstName: firstNameUser,
      name: nameUser,
      adress: {
        country: adressCountry,
        city: adressCity,
        street: adressStreet,
      },
      email_user: emailUser,
      products: cart,
      totalPrice: totalPrice,
    };
    await addDoc(paymentCollectionRef, newField);
  };

  const { openPayment, cart } = useSelector((state) => ({
    ...state.cartReducer,
  }));

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
    } else {
      setDeliveryPrice(20);
    }

    
  }, [sumWeight, adressCountry]);

  let totalPriceCart = 0;
  if (cartState.cart.length !== 0) {
    for (const item of cartState.cart) {
      const itemPrice = item.price * item.quantity;
      totalPriceCart += itemPrice;
    }
  }

  const totalPrice = deliveryPrice + totalPriceCart;

  const sendMessageConfirmation = () => {
    emailjs.send(
      "service_p1h4m9i",
      "template_c61bw3i",
      {
        to_name: firstNameUser,
        user_email: emailUser,
      },
      "user_S6W9cox0UxXXczGLydsea"
    );
  };

  const createOrder = (data, actions) => {
    
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency: "EUR",
            value: totalPrice,
          },
          shipping: {
            adress: {
              adress_line_1: "ok",
              admin_area_2: "ok",
              postal_code: "31",
            },
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then(function (details) {
        cart.forEach((prod) => {
          dispatch({
            type: "UPDATEPRODUCTAFTERBUY",
            payload: prod,
          });
        });
      })

      .then(function () {
        sendMessageConfirmation();
        addUserInPayment();
        dispatch({
          type: "RESETCART",
        });
      })
      .then(function () {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  return (
    <div className={openPayment ? "payment active" : "payment"}>
      <>
        <div className="total">
          <div className="delivery">
            <p>Livraison:</p>
            <span>{deliveryPrice}€</span>
          </div>
          <div className="total-cart">
            <p>Prix pieces:</p>
            <span>{totalPriceCart}€</span>
          </div>
          <div className="total-price">
            <p>Total:</p>
            <span>{totalPrice}€</span>
          </div>
        </div>
        <div onClick={previousPage} className="previous">
          <ArrowLeft color="rgba(134, 90, 71, 1)" />
        </div>

        <PayPalButton 
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </>
    </div>
  );
};

export default Payment;
