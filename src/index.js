import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import store from "./store/store";


import './assets/scss/style.scss';

import App from './App';

import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDWVWp1ww2gSU0z3taKC2FyMoPn3PBu8_Q",
  authDomain: "testproject-375af.firebaseapp.com",
  projectId: "testproject-375af",
  storageBucket: "testproject-375af.appspot.com",
  messagingSenderId: "908482964017",
  appId: "1:908482964017:web:7d06e6bb1d43c58f3d0310",  
  databaseURL: "https://testproject-375af.europe-central2.firebasedatabase.app",
});

/*let database = firebase.database();
const dbRef = firebase.database().ref();
dbRef.child("adverts").get().then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot);
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});*/



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);