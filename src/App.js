import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
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
import './App.scss';
import { Parallax } from "react-parallax";

function App() {

 
  /* History */
  const history = useHistory();
  const {background} = useSelector((state) =>({
    ...state.appReducer
  }))
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
      payload: color
    })
  }

  const backgroundImage = (bg) => {
    dispatch({
      type: "BACKGROUND",
      payload: bg
    })
  }

  const { changePage } = useSelector((state) => ({
    ...state.appReducer,
  }));

  const [navi, setNavi] = useState(false)

  useEffect(() => {
    

    
      window.addEventListener('scroll', (e) => {
        if (history.location.pathname === "/") {
          if(document.documentElement.scrollTop > 90) {
            setNavi(true)
          } 
          if(document.documentElement.scrollTop < 90) {
            setNavi(false)
          } 
        }
      })
    
    
    
  }, [])



  useEffect(() => {
    if (history.location.pathname === "/") {
      homePageFalse(true);
      colorFooter("rgb(248,190,183)");
      backgroundImage("bgHome")
    
    }

    if (history.location.pathname.startsWith("/produits")) {
      homePageFalse(false);
      colorFooter("rgb(233, 242, 198)")
      backgroundImage("bgProducts")
      setNavi('')
    }
    if (history.location.pathname === "/à-propos") {
      homePageFalse(false);
      colorFooter("rgb(255, 221, 202)")
      backgroundImage("bgContact")
    }
    if (history.location.pathname === "/contact") {
      homePageFalse(false);
      colorFooter("rgb(255, 221, 202)")
      backgroundImage("bgContact")
    }
    if (history.location.pathname === "/panier") {
      homePageFalse(false);
      colorFooter("rgb(248,190,183)")
      backgroundImage("bgHome")
    }
  }, [changePage]);




  
  return (
    <Parallax  bgImage={`/assets/images/background/${background}.png`} bgImageAlt="arriere plan coloré" strength={300}>
      <Navbar color= {navi}/>
      <MenuResponsive />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/produits" component={Products} />
        <Route exact path="/produits/:id" component={ProductShowcase} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/panier" component={Cart} />
        <Route exact path="/à-propos" component={About} />
      </Switch>
      <Footer />
    </Parallax>
  );
}

export default App;
