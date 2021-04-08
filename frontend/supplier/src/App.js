import './App.css';

import Navigation from "./component/widget/Navigation"
import Login from "./component/page/Login"
import Signup from "./component/page/Signup"
import Products from "./component/page/Products"
import Profile from "./component/page/Profile"
import AddProduct from "./component/page/AddProduct"

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Products} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/product" component={Products} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/add-product" component={AddProduct} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
