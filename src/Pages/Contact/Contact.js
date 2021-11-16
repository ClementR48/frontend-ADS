import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Parallax } from "react-parallax";
import ScrollToTop from "../../Components/ScrollToTop";
import emailjs from "emailjs-com";
import "./Contact.scss";
import { Instagram } from "react-feather";
import { useRef } from "react";

const Contact = () => {
  const formRef = useRef();

  /* apparition au scroll */

  const callbackFunction = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.boundingClientRect.left > 80) {
          entry.target.children[1].style.opacity = 1;
          entry.target.children[1].style.transform = "translateX(0)";
          entry.target.style.boxShadow = "-10px 10px 10px #865a4742";
        } else {
          entry.target.children[1].style.opacity = 1;
          entry.target.children[1].style.transform = "translateY(0)";
          entry.target.style.boxShadow = "-10px 10px 10px #865a4742";
        }
      } else {
        if (entry.boundingClientRect.left > 80) {
          entry.target.children[1].style.opacity = 1;
          entry.target.children[1].style.transform = "translateX(-100%)";
          entry.target.style.boxShadow = "none";
        } else {
          entry.target.children[1].style.opacity = 0;
          entry.target.children[1].style.transform = "translateY(-300px)";
          entry.target.style.boxShadow = "none";
        }
      }
    });
  };

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: "0%",
      threshold: 0.55,
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);

    observer.observe(formRef.current);
  }, [options, formRef]);

  /* Validation Form */

  const [name, setName] = useState("");
  const [objet, setObjet] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = () => {
    let element = document.querySelector(".label-email");
    let regex = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+";
    if (email.match(regex)) {
      element.style.color = "";
      return true;
    } else {
      element.style.color = "rgb(253,87,87)";
      return false;
    }
  };

  const failMessage = () => {
    if (name === "") {
      let nameLabelElement = document.querySelector(".label-name");
      nameLabelElement.style.color = "red";
    } else {
      let nameLabelElement = document.querySelector(".label-name");
      nameLabelElement.style.color = "blue";
    }
    if (email === "") {
      let nameLabelElement = document.querySelector(".label-email");
      nameLabelElement.style.color = "red";
    }
    if (objet === "") {
      let nameLabelElement = document.querySelector(".label-objet");
      nameLabelElement.style.color = "red";
    }
    if (message === "") {
      let nameLabelElement = document.querySelector(".label-message");
      nameLabelElement.style.color = "red";
    }
  };

  const successMessage = () => {
    let formMessageElement = document.querySelector(".form-message");
    formMessageElement.innerHTML =
      "Message envoyé, nous vons recontacterons au plus vite :)";
    formMessageElement.style.background = "rgb(8,43,177)";
    formMessageElement.style.opacity = "1";
  };

  function sendEmail(e) {
    e.preventDefault();
    if (name && email && message) {
      if (name && validateEmail() && message) {
        emailjs
          .sendForm(
            "service_p1h4m9i",
            "template_o4g4vph",
            e.target,
            "user_S6W9cox0UxXXczGLydsea"
          )
          .then(
            (result) => {
              formRef.current.children[1].style.opacity = 0;
              formRef.current.children[1].style.transform =
                "translateX(-300px)";
              formRef.current.style.boxShadow = "none";
              setName("");
              setObjet("");
              setMessage("");
              setEmail("");
            },
            (error) => {
              console.log(error.text);
            }
          );
      } else {
        alert("bellecek");
      }
    } else {
      failMessage();
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5 }}
    >
      <ScrollToTop />
      <Parallax
        bgImage={`/assets/images/background/bgContact.png`}
        bgImageAlt="arriere plan coloré"
        strength={1000}
      >
        <div className="contact-page">
          <h2>Demande de contact</h2>
          <motion.div
            initial={{ opacity: 0, translateX: 200 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: 200 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="introduction"
          >
            <p>
              Que vous soyez un particulier ou un professionnel, si vous avez
              une demande particulière ou besoin d’informations, n’hésitez pas à
              me contacter via ce formulaire et j’y répondrai avec plaisir.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateX: -200 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -200 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="formulaire"
            ref={formRef}
          >
            <div className="left">
              <div className="hello">
                <div className="container-hello">
                  <p className="just">just</p>
                  <p className="say-hi">say hi !</p>
                </div>
              </div>
              <div className="contact">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/mariefekceramics/?hl=fr"
                >
                  <Instagram />
                </a>
              </div>
              <img
                src={process.env.PUBLIC_URL + "/assets/images/logoRose.png"}
                alt="logo"
              ></img>
            </div>
            <form className="right" onSubmit={sendEmail}>
              <label className="label-name" htmlFor="name">
                Nom
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></input>
              <label className="label-email" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="input-email"
                type="mail"
                value={email}
                name="email"
                onChange={(event) => {
                  console.log(event.target.value);
                  validateEmail();
                  setEmail(event.target.value);
                }}
              ></input>
              <label className="label-objet" htmlFor="objet">
                Objet
              </label>
              <input
                id="objet"
                type="text"
                value={objet}
                name="objet"
                onChange={(event) => {
                  setObjet(event.target.value);
                }}
              ></input>
              <label className="label-message" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                name="message"
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              ></textarea>
              <button type="submit">Envoyer</button>
              <div className="form-message"></div>
            </form>
          </motion.div>
        </div>
      </Parallax>
    </motion.div>
  );
};

export default Contact;
