import React, { useEffect, useState } from "react";
import "./Home.scss";
import ArticlesHome from "../../Components/HomeComponents/ArticlesHome/ArticlesHome";
import ImageHome from "../../Components/HomeComponents/ImageHome/ImageHome";
import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import ScrollToTop from "../../Components/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";

import { getHomeData } from "../../redux/reducer/appReducer";
import Navbar from "../../Components/General/Navbar/Navbar";
import Footer from "../../Components/General/Footer/Footer";
import { useHistory } from "react-router";

const Home = () => {
  /* recuperation data de la bdd */
  const { homeData } = useSelector((state) => ({
    ...state.appReducer,
  }));

  console.log(homeData);

  const dispatch = useDispatch();
  useEffect(() => {
    if (homeData.length === 0) {
      dispatch(getHomeData());
    }
  }, [homeData.length, dispatch ]);

  /* States */

  const [homePage, setHomePage] = useState(true);
  const [changeNavScroll, setChangeNavScroll] = useState(false);

  /* Animation au scroll de la nav */

  const history = useHistory();

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (history.location.pathname === "/") {
        if (document.documentElement.scrollTop > 90) {
          setChangeNavScroll(true);
        }
        if (document.documentElement.scrollTop < 90) {
          setChangeNavScroll(false);
        }
      }
    });
  }, [history.location.pathname]);

  return (
    <>
      {homeData.length !== 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="home"
        >
          <Navbar isHomePage={homePage} changeNavScroll={changeNavScroll} />
          <ScrollToTop />
          <Parallax
            bgImage={homeData[0].backgroundImage}
            bgImageAlt="arriere plan coloré"
            strength={1000}
            className='parallax'
          >

            <motion.div
              initial={{ opacity: 0, translateX: 300 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: -300 }}
              transition={{ duration: 1 }}
            >
              <ImageHome dataImage={homeData[0].homeImage} />
            </motion.div>
            <motion.div
              exit={{ translateX: 100, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <ArticlesHome dataArticles={homeData} />
            </motion.div>
          </Parallax>
          <Footer footerColor={homeData[0].footerColor}/>
        </motion.div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
