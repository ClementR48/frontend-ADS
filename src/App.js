import { Route, Switch, useLocation } from "react-router-dom";

import "./App.scss";
import MenuResponsive from "./Components/General/MenuReponsive/MenuResponsive";

import About from "./Pages/About/About";
import Cart from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import ProductShowcase from "./Pages/ProductShowcase/ProductShowcase";
import "./App.scss";

import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <>
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
      
    </>
  );
}

export default App;
