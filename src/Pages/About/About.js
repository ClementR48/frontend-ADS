import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import ScrollToTop from "../../Components/ScrollToTop";
import aboutData from "../../utils/aboutData";

import "./About.scss";

const About = () => {
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
        <main className="about-me">
            <motion.h2
              initial={{ opacity:0}}
              animate={{ opacity:1 }}
              exit={{opacity:0}}
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
              src={process.env.PUBLIC_URL + aboutData.picture}
              alt="Marie"
            />
            <motion.div
              initial={{ translateX: 200, opacity: 0 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ translateX: 200, opacity: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text"
            >
              <p>{aboutData.text}</p>
            </motion.div>
          </div>
        </main>
      </Parallax>
    </motion.div>
  );
};

export default About;
