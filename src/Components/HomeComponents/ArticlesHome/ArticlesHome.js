import React from "react";
import "./ArticlesHome.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import homeData from "../../../utils/homeData";


const ArticlesHome = () => {

  const dispatch = useDispatch()

  const changePageFunc = (value) => {
    dispatch({
      type: "CHANGEPAGE",
      payload: value
    })
  }
 
  return (
    <main className="home-article">
      <div className="article">
        <div className="informations">
          <h2 className="title">{homeData[0].titre}</h2>
          <p className="text">{homeData[0].description}</p>
          <Link onClick={() => changePageFunc(15)} to="/produits">Acceder au shop</Link>
        </div>
        <div className="picture">
          <img src={homeData[0].image} alt="vase"></img>
        </div>
      </div>

      <div className="article2">
        <div className="informations">
          <h2 className="title">{homeData[1].titre}</h2>
          <p className="text">{homeData[1].description}</p>
          <Link onClick={() => changePageFunc(15)} to="/produits">Acceder au shop</Link>
        </div>
        <div className="picture">
          <img src={homeData[1].image} alt="vase"></img>
        </div>
      </div>
    </main>
  );
};

export default ArticlesHome;
