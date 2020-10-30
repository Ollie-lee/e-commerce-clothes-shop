import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/Header";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/SignInAndSignUp";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
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
        <Route
          exact
          path='/signin'
          render={(routeProps) => <SignInAndSignUp {...routeProps} />}
        />
      </Switch>
    </div>
  );
}

export default App;
