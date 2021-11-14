import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./App.scss";
import Footer from "./Components/General/Footer/Footer";
import MenuResponsive from "./Components/General/MenuReponsive/MenuResponsive";
import Navbar from "./Components/General/Navbar/Navbar";
import About from "./Pages/About/About";
import Cart from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import ProductShowcase from "./Pages/ProductShowcase/ProductShowcase";
import "./App.scss";



import { AnimatePresence, useAnimation } from "framer-motion";


function App() {
  

  /* History */
  const history = useHistory();

  const dispatch = useDispatch();
  const homePageFalse = (bool) => {
    dispatch({
      type: "HOMEPAGE",
      payload: bool,
    });
  };
  const colorFooter = (color) => {
    dispatch({
      type: "COLORFOOTER",
      payload: color,
    });
  };

 

  const { changePage } = useSelector((state) => ({
    ...state.appReducer,
  }));

  const [scrollNav, setscrollNav] = useState(false);

  const location = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (history.location.pathname === "/") {
        if (document.documentElement.scrollTop > 90) {
          setscrollNav(true);
        }
        if (document.documentElement.scrollTop < 90) {
          setscrollNav(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (history.location.pathname === "/") {
      homePageFalse(true);
      colorFooter("rgb(248,190,183)");
      
    }

    if (history.location.pathname.startsWith("/produits")) {
      homePageFalse(false);
      colorFooter("rgb(233, 242, 198)");
      setscrollNav("");
    }
    if (history.location.pathname === "/à-propos") {
      homePageFalse(false);
      colorFooter("rgb(255, 221, 202)");
      
    }
    if (history.location.pathname === "/contact") {
      homePageFalse(false);
      colorFooter("rgb(255, 221, 202)");
     
    }
    if (history.location.pathname === "/panier") {
      homePageFalse(false);
      colorFooter("rgb(248,190,183)");
      
    }
  }, [changePage]);

  return (
    <>
      
      <Navbar color={scrollNav} />
      <MenuResponsive />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Home} />
          <Route exact path="/produits" component={Products} />
          <Route exact path="/produits/:id" component={ProductShowcase} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/panier" component={Cart} />
          <Route exact path="/à-propos" component={About} />
        </Switch>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
