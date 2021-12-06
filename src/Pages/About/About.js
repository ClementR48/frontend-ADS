import { motion } from "framer-motion";
import { useEffect } from "react";
import { Background, Parallax } from "react-parallax";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/General/Footer/Footer";
import Navbar from "../../Components/General/Navbar/Navbar";
import Loader from "../../Components/Loader/Loader";
import ScrollToTop from "../../Components/ScrollToTop";
import { getAboutData } from "../../redux/reducer/appReducer";

import "./About.scss";

const About = () => {
  const { aboutData } = useSelector((state) => ({
    ...state.appReducer,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    if (aboutData.length === 0) {
      dispatch(getAboutData());
    }
  }, [dispatch, aboutData.length]);
  return (
    <>
      {aboutData.length !== 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="about-me"
        >
          <ScrollToTop />
          <Parallax
            
            strength={1000}
          >
             <Background className="bg-custom">
              <img src={aboutData[0].backgroundImage} alt="" />
            </Background>
          <Navbar />
            <main className="container-page-about" >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                À propos
              </motion.h2>
              <div className="container-about">
                <motion.img
                  initial={{ translateX: -200, opacity: 0 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ translateX: -200, opacity: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  src={aboutData[0].picture}
                  alt="Marie"
                />
                <motion.div
                  initial={{ translateX: 200, opacity: 0 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ translateX: 200, opacity: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text"
                >
                  <p>{aboutData[0].txt}</p>
                </motion.div>
              </div>
            </main>
          <Footer footerColor = {aboutData[0].footerColor} />
          </Parallax>
        </motion.div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default About;
