import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import "./App.css";

function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path='/'
          render={(routeProps) => <HomePage {...routeProps} />}
        />
        <Route
          exact
          path='/shop'
          render={(routeProps) => <ShopPage {...routeProps} />}
        />
      </Switch>
    </div>
  );
}

export default App;
