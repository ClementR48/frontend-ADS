import { motion } from "framer-motion";
import { useEffect } from "react";
import { Parallax } from "react-parallax";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/General/Navbar/Navbar";
import Loader from "../../Components/Loader/Loader";
import ScrollToTop from "../../Components/ScrollToTop";
import { getAboutData } from "../../redux/reducer/appReducer";

import "./About.scss";

const About = () => {
  const { aboutData } = useSelector((state) => ({
    ...state.appReducer,
  }));

  console.log(aboutData);

  const dispatch = useDispatch();
  useEffect(() => {
    if (aboutData.length === 0) {
      dispatch(getAboutData());
    }
  }, []);
  return (
    <>
      <ScrollToTop />
      {aboutData.length !== 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Parallax
            bgImage={aboutData[0].backgroundImage}
            bgImageAlt="arriere plan coloré"
            strength={1000}
          >
            <Navbar />
            <main className="about-me">
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
          </Parallax>
        </motion.div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default About;
