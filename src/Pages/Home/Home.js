import React, { useEffect } from "react";
import "./Home.scss";
import ArticlesHome from "../../Components/ArticlesHome/ArticlesHome";
import ImageHome from "../../Components/ImageHome/ImageHome";
import { Parallax } from "react-parallax";

const Home = () => {

  return (
    <Parallax  bgImage="/assets/images/background/bgContact.png" bgImageAlt="the cat" strength={700}z>
      <ImageHome  />
      <ArticlesHome />
    </Parallax>
  );
};

export default Home;
