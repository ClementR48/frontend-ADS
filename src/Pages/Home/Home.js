import React, { useEffect } from "react";
import "./Home.scss";
import ArticlesHome from "../../Components/HomeComponents/ArticlesHome/ArticlesHome";
import ImageHome from "../../Components/HomeComponents/ImageHome/ImageHome";
import { Parallax } from "react-parallax";
import {motion} from 'framer-motion';



const Home = () => {

  
  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{duration:1}}
    >
      <Parallax
        bgImage={`/assets/images/background/bgHome.png`}
        bgImageAlt="arriere plan coloré"
        strength={1000}
      >
        <ImageHome />
        <ArticlesHome/>
      </Parallax>
    </motion.div>
  );
};

export default Home;
