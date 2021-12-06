import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "../../Overlay/Overlay";
import Payment from "../Payment/Payment";
import "./Checkout.scss";

const Checkout = () => {
  const { openCheckout, openPayment } = useSelector((state) => ({
    ...state.cartReducer,
  }));

  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [adressCountry, setAdressCountry] = useState("");
  const [email, setEmail] = useState("");
  const [adressCity, setAdressCity] = useState("");
  const [adressPostal, setAdressPostal] = useState("");
  const [adressStreet, setAdressStreet] = useState("");
  const [adressNumberStreet, setAdressNumberStreet] = useState("");

  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((res) => res.json())
      .then((datas) => setData(datas));
  }, []);

  const buttonNext = "Suivant";

  const sendButtonLetters = buttonNext.split("");

  const dispatch = useDispatch();
  const changeCheckout = () => {
    dispatch({
      type: "OPENPAYMENT",
    });
  };
  const closeCheckout = () => {
    dispatch({
      type: "OPENCHECKOUT",
    });
  };

  const inputRef = useRef([]);

  const addRef = (el) => {
    if (el && !inputRef.current.includes(el)) {
      inputRef.current.push(el);
    }
  };

  const validateEmail = () => {
    let regex = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+";
    if (email.match(regex)) {
      return true;
    } else {
      return false;
    }
  };

  

  const verificationBeforeBuy = () => {
    if (
      name === "" ||
      firstName === "" ||
      email === "" ||
      adressCity === "" ||
      adressPostal === "" ||
      adressStreet === "" ||
      adressCountry === "" ||
      adressCountry === "Choisir un pays"
    ) {
      for (let index = 0; index < inputRef.current.length; index++) {
        if (
          inputRef.current[index].value === "" ||
          inputRef.current[index].value === "Choisir un pays"
        ) {
          inputRef.current[index].style.borderBottom = "red 1px dashed";
        } else {
          inputRef.current[index].style.borderBottom =
            "rgba(134, 90, 71, 1) 1px dashed";
        }
      }

      return false;
    } else {
      for (let index = 0; index < inputRef.current.length; index++) {
        inputRef.current[index].style.borderBottom =
          "rgba(134, 90, 71, 1) 1px dashed";
      }

      if (!validateEmail()) {
        inputRef.current[2].style.borderBottom = "red 1px dashed";
      } else {
        inputRef.current[2].style.borderBottom =
          "rgba(134, 90, 71, 1) 1px dashed";
        changeCheckout();
        return true;
      }
    }
  };

  return (
    <>
      {data !== undefined ? (
        <>
          {openCheckout && <Overlay />}
          <form
            className={openCheckout ? "checkout-page active" : "checkout-page"}
          >
            <div
              className={openPayment ? "informations active" : "informations"}
            >
              <h2>Informations</h2>
              <div className="close-modal" onClick={closeCheckout}>
                <div className="container-close-modal">
                  <X color="rgba(134, 90, 71, 1)" />
                </div>
              </div>
              <div className="informations-user">
                <label htmlFor="name">Nom</label>
                <input
                  ref={addRef}
                  type="text"
                  for="name"
                  value={name}
                  onInput={(e) => setName(e.target.value)}
                />

                <label htmlFor="name">Prénom</label>
                <input
                  ref={addRef}
                  type="text"
                  for="firstName"
                  value={firstName}
                  onInput={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                  ref={addRef}
                  type="email"
                  for="email"
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="informations-adress">
                <label htmlFor="country">Pays</label>
                <select
                  htmlFor="country"
                  ref={addRef}
                  value={adressCountry}
                  onInput={(e) => setAdressCountry(e.target.value)}
                >
                  <option defaultValue>Choisir un pays</option>
                  {data.map((country, index) => {
                    return <option key={index}>{country.name}</option>;
                  })}
                </select>

                <label htmlFor="street">Adresse</label>
                <input
                  ref={addRef}
                  type="text"
                  htmlFor="street"
                  value={adressStreet}
                  onInput={(e) => setAdressStreet(e.target.value)}
                />
                <label htmlFor="numberStreet">Complément d'adresse</label>
                <input
                  ref={addRef}
                  type="text"
                  for="numberStreet"
                  value={adressNumberStreet}
                  onInput={(e) => setAdressNumberStreet(e.target.value)}
                />

                <label htmlFor="city">Ville</label>
                <input
                  ref={addRef}
                  type="text"
                  htmlFor="city"
                  value={adressCity}
                  onInput={(e) => setAdressCity(e.target.value)}
                />

                <label htmlFor="postal">Code postal</label>
                <input
                  ref={addRef}
                  type="text"
                  htmlFor="postal"
                  value={adressPostal}
                  onInput={(e) => setAdressPostal(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={verificationBeforeBuy}
                className="checkout"
              >
                <div className="span-container s1">
                  {sendButtonLetters.map((letter, index) => {
                    return (
                      <span
                        key={index}
                        style={{
                          transitionDelay: ` ${0.05 * index}s`,
                        }}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </div>
                <div className="span-container s2">
                  {sendButtonLetters.map((letter, index) => {
                    return (
                      <span
                        key={index}
                        style={{
                          transitionDelay: ` ${0.05 * index}s`,
                        }}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </div>
              </button>
            </div>
            <Payment adressCountry={adressCountry}/>
          </form>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Checkout;
