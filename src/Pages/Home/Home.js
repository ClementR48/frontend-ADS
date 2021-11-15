import React, { useEffect } from "react";
import "./Home.scss";
import ArticlesHome from "../../Components/HomeComponents/ArticlesHome/ArticlesHome";
import ImageHome from "../../Components/HomeComponents/ImageHome/ImageHome";
import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import ScrollToTop from "../../Components/ScrollToTop";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Parallax
        bgImage={`/assets/images/background/bgHome.png`}
        bgImageAlt="arriere plan coloré"
        strength={1000}
      >
        <ScrollToTop />
        <motion.div
          initial={{ opacity: 0, translateX: 300 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, translateX: -300 }}
          transition={{ duration: 1 }}
        >
          <ImageHome />
        </motion.div>
        <motion.div exit={{translateX: 100, opacity:0}} transition={{duration: 1}}>
          <ArticlesHome />
        </motion.div>
      </Parallax>
    </motion.div>
  );
};

export default Home;
