import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBqEx7GqqmsZEf3g2GfmKQ_qvaU-WROiTE",
  authDomain: "crwn-db-9eca7.firebaseapp.com",
  databaseURL: "https://crwn-db-9eca7.firebaseio.com",
  projectId: "crwn-db-9eca7",
  storageBucket: "crwn-db-9eca7.appspot.com",
  messagingSenderId: "739054828973",
  appId: "1:739054828973:web:92f537751add89b4423524",
  measurementId: "G-6E5X772YLV",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google authentication
const provider = new firebase.auth.GoogleAuthProvider();
//we want to always trigger the Google pop up when ever we use this Google auth
//provider for authentication and sign in
provider.setCustomParameters({ prompt: "select_account" });

//pass google provider popup (other popup like twitter)
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//in case we want the whole library.
export default firebase;
