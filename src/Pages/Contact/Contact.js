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
  const [classForm, setClassForm] = useState("right");

  /* apparition au scroll */

  const callbackFunction = (entries) => {
    if (entries[0].isIntersecting) {
      setClassForm("right active");
    } else {
      setClassForm("right");
    }
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

  const allValidateRef = useRef([]);

  const addValidateRef = (el) => {
    if (el && !allValidateRef.current.includes(el)) {
      allValidateRef.current.push(el);
    }
  };

  const [name, setName] = useState("");
  const [objet, setObjet] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (emailValue) => {
    let regex = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+";
    if (email.match(regex)) {
      allValidateRef.current[1].style.fontWeight = "400";
      allValidateRef.current[1].style.fontStyle = "normal";

      return true;
    } else {
      allValidateRef.current[1].style.fontWeight = "bold";
      allValidateRef.current[1].style.fontStyle = "italic";

      return false;
    }
  };

  const failMessage = () => {
    if (name === "") {
      allValidateRef.current[0].style.fontWeight = "bold";
      allValidateRef.current[0].style.fontStyle = "italic";
    } else {
      allValidateRef.current[0].style.fontWeight = "400";
      allValidateRef.current[0].style.fontStyle = "normal";
    }
    if (email === "") {
      allValidateRef.current[1].style.fontWeight = "bold";
      allValidateRef.current[1].style.fontStyle = "italic";
    } else {
      allValidateRef.current[1].style.fontWeight = "400";
      allValidateRef.current[1].style.fontStyle = "normal";
    }
    if (objet === "") {
      allValidateRef.current[2].style.fontWeight = "bold";
      allValidateRef.current[2].style.fontStyle = "italic";
    } else {
      allValidateRef.current[2].style.fontWeight = "400";
      allValidateRef.current[2].style.fontStyle = "normal";
    }
    if (message === "") {
      allValidateRef.current[3].style.fontWeight = "bold";
      allValidateRef.current[3].style.fontStyle = "italic";
    } else {
      allValidateRef.current[3].style.fontWeight = "400";
      allValidateRef.current[3].style.fontStyle = "normal";
    }
  };

  function sendEmail(e) {
    e.preventDefault();
    if (name && email && message) {
      if (validateEmail()) {
        emailjs
          .sendForm(
            "service_p1h4m9i",
            "template_o4g4vph",
            e.target,
            "user_S6W9cox0UxXXczGLydsea"
          )
          .then(
            (result) => {
              setClassForm("right");
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
        allValidateRef.current[1].style.fontWeight = "bold";
        allValidateRef.current[1].style.fontStyle = "italic";
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
          >
            <div
              className="left"
              style={{
                backgroundImage:
                  "url(/assets/images/PhotoFormulaireContact.jpg)",
                backgroundOrigin: "border-box",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
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
                src={process.env.PUBLIC_URL + "/assets/images/logoBlanc .png"}
                alt="logo"
              ></img>
            </div>
            <form className={classForm} onSubmit={sendEmail} ref={formRef}>
              <label ref={addValidateRef} htmlFor="name">
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
              <label ref={addValidateRef} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="input-email"
                value={email}
                type="mail"
                name="email"
                onChange={(event) => {
                  validateEmail(event.target.value);
                  setEmail(event.target.value);
                }}
              ></input>
              <label ref={addValidateRef} htmlFor="objet">
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
              <label ref={addValidateRef} htmlFor="message">
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
