import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/Header";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/SignInAndSignUp";
import { auth, createUserProfileDocument } from "./firebase/filebase.utils";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    //when APP is mounted, add an subscription function to observe user's sign in-out state
    //once changed, trigger the callback func
    let unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      //when user sign in, user is an object, when user sign out, user is null
      setCurrentUser(user);
      createUserProfileDocument(user);
    });

    return () => {
      //clean up func for Oauth
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <div>
      <Header currentUser={currentUser} />
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
