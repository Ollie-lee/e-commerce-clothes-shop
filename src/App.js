import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/Header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import { auth, createUserProfileDocument } from './firebase/filebase.utils';
import './App.css';
import { setCurrentUser } from './redux/user/user.action';

function App({ setCurrentUser }) {
  useEffect(() => {
    //when APP is mounted, add an subscription function to observe user's sign in-out state
    //once changed, trigger the callback func
    let unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //when user sign in, user is an object, when user sign out, user is null
      //when user sign out, we don't want to set anything here
      if (userAuth) {
        // check if our database has updated At that reference with any new data
        const userRef = await createUserProfileDocument(userAuth); // add user to firebase if user not exist
        //we actually do not get any data until we use data() method
        //when we switch users, our user reference changes(i.e. user document)
        //which trigger the callback
        //onSnapshot() is equal to reference.get(), which is another way of retrieve data
        userRef.onSnapshot((snapshot) => {
          //data is only retrieved when using snapshot.data()
          //every time current user document changes in the backend,
          //the latest info will be sent in the observer, so we can sync front/back end
          setCurrentUser({ id: snapshot.id, ...snapshot.data() });
        });
      } else {
        //user sign out, set current user null
        setCurrentUser(userAuth);
      }
    });

    return () => {
      //clean up func for Oauth
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => <HomePage {...routeProps} />}
        />
        <Route
          exact
          path="/shop"
          render={(routeProps) => <ShopPage {...routeProps} />}
        />
        <Route
          exact
          path="/signin"
          render={(routeProps) => <SignInAndSignUp {...routeProps} />}
        />
      </Switch>
    </div>
  );
}

const mapDispatchToPros = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToPros)(App);
