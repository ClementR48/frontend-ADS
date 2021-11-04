import React, { useEffect } from "react";
import "./Home.scss";
import ArticlesHome from "../../Components/ArticlesHome/ArticlesHome";
import ImageHome from "../../Components/ImageHome/ImageHome";
import { Parallax } from "react-parallax";

const Home = () => {
  return (
    <>
      <ImageHome />
      <ArticlesHome />
    </>
  );
};

export default Home;
