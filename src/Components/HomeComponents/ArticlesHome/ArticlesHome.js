import React, { useEffect } from "react";
import "./ArticlesHome.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import homeData from "../../../utils/homeData";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ArticlesHome = () => {
  const [ref1, inView] = useInView({
    threshold: 0.3,
  });
  const [ref2, InView] = useInView({
    threshold: 0.3,
  });

  const animation1 = useAnimation();
  const animation2 = useAnimation();

  useEffect(() => {
    if (inView) {
      animation1.start({
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          duration: 3,
          bounce: 0.2,
        },
      });
    }

    if (!inView) {
      animation1.start({
        x: -100,
        opacity: 0,
      });
    }
  }, [inView]);

  useEffect(() => {
    if (InView) {
      animation2.start({
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          duration: 3,
          bounce: 0.2,
        },
      });
    }

    if (!InView) {
      animation2.start({
        x: 100,
        opacity: 0,
      });
    }
  }, [InView]);

  const dispatch = useDispatch();

  const changePageFunc = (value) => {
    dispatch({
      type: "CHANGEPAGE",
      payload: value,
    });
  };

  return (
    <main className="home-article">
      <motion.div ref={ref1} className="article" animate={animation1}>
        <div className="informations">
          <h2 className="title">{homeData[0].titre}</h2>
          <p className="text">{homeData[0].description}</p>
          <Link onClick={() => changePageFunc(15)} to="/produits">
            Acceder au shop
          </Link>
        </div>
        <div className="picture">
          <img src={homeData[0].image} alt="vase"></img>
        </div>
      </motion.div>

      <motion.div ref={ref2} animate={animation2} className="article2">
        <div className="informations">
          <h2 className="title">{homeData[1].titre}</h2>
          <p className="text">{homeData[1].description}</p>
          <Link onClick={() => changePageFunc(15)} to="/produits">
            Acceder au shop
          </Link>
        </div>
        <div className="picture">
          <img src={homeData[1].image} alt="vase"></img>
        </div>
      </motion.div>
    </main>
  );
};

export default ArticlesHome;
