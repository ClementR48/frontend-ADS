import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./App.scss";
import MenuResponsive from "./Components/MenuReponsive/MenuResponsive";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Pages/About/About";
import Cart from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import ProductShowcase from "./Pages/ProductShowcase/ProductShowcase";

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

  const { changePage } = useSelector((state) => ({
    ...state.appReducer,
  }));



  useEffect(() => {
    if (history.location.pathname === "/") {
      homePageFalse(true);
      window.addEventListener('scroll', (e) => {
        console.log(window.scrollY);
      })
    }

    if (history.location.pathname === "/produits") {
      homePageFalse(false);
      
    }
    if (history.location.pathname === "/à-propos") {
      homePageFalse(false);
    }
    if (history.location.pathname === "/contact") {
      homePageFalse(false);
    }
    if (history.location.pathname === "/panier") {
      homePageFalse(false);
    }
  }, [changePage]);


  
  return (
    <>
      <Navbar />
      <MenuResponsive />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/produits" component={Products} />
        <Route exact path="/produits/:id" component={ProductShowcase} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/panier" component={Cart} />
        <Route exact path="/à-propos" component={About} />
      </Switch>
    </>
  );
}

export default App;
