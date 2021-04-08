import './App.css';

import Cart from "./component/page/Cart"
import Login from "./component/page/Login"
import Signup from "./component/page/Signup"
import WishList from "./component/page/WishList"
import Products from "./component/page/Products"
import Supplier from "./component/page/Supplier"
import Navigation from "./component/widget/Navigation"

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Supplier} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/supplier" component={Supplier} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/wishlist" component={WishList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
