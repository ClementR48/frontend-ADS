
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.scss';
import MenuResponsive from './Components/MenuReponsive/MenuResponsive';
import Navbar from './Components/Navbar/Navbar';
import About from './Pages/About/About';
import Cart from './Pages/Cart/Cart';
import Contact from './Pages/Contact/Contact';
import Home from './Pages/Home/Home';
import Products from './Pages/Products/Products';
import ProductShowcase from './Pages/ProductShowcase/ProductShowcase';

function App() {
  
  
  return (
    <Router>
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
    </Router>
  );
}

export default App;
