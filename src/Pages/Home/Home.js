import React from "react";
import "./Home.scss";
import ArticlesHome from "../../Components/HomeComponents/ArticlesHome/ArticlesHome";
import ImageHome from "../../Components/HomeComponents/ImageHome/ImageHome";
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
