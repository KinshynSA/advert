import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { changeLang } from "./store/langSlice.js";

import Header from './components/header/header.js';
import Registration from './components/login/registration.js';
import Login from './components/login/login.js';
import Profile from './components/profile/profile.js';
import Favourites from './components/favourites/favourites.js';
import Advert from './components/advert/advert.js';
import AdvertAdd from './components/advertadd/advertadd.js';
import Home from './components/home/home.js';
import Footer from './components/footer/footer.js';
//import Chat from './components/chat/chat.js';
import Alert from './components/alert/alert.js';
import Test from './components/test/test.js';


function findHeaderHeight(){
  let result = 0;
  if(document.querySelector('.header-main')){
    result = getComputedStyle(document.querySelector('.header-main')).height;
  }
  return result;
}

function SecureRoute(props){
  const user = useSelector((store) => store.user);
  if(props.secure){
    if(user.user){
      return (
        <Route path={props.path}>
          {props.children}
        </Route>
      )
    } else {
      Alert.error('У вас нет доступа к этой странице')
      return (
        <Redirect to="/login" />
      )
    }
  }
  
  return (
    <Route path={props.path}>
      {props.children}
    </Route>
  )
}

export default function App() {
  const user = useSelector((store) => store.user);
  const lang = useSelector((store) => store.lang.lang);
  const chat = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  const [documentWidth, setDocumentWidth] = useState(document.documentElement.clientWidth)

  window.addEventListener('resize', (e) => {
    setDocumentWidth(document.documentElement.clientWidth)
  })

  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    setHeaderHeight(findHeaderHeight())
  }, [])

  useEffect(() => {
    setHeaderHeight(findHeaderHeight())
  }, [documentWidth])

  return (
    <Router>
      <main className="main" style={{paddingTop: headerHeight}}>
        <Switch>
          <SecureRoute path="/registration">
            <Registration />
          </SecureRoute>
          <SecureRoute path="/login">
            <Login />
          </SecureRoute>
          <SecureRoute path="/profile" secure={true}>
            <Profile />
          </SecureRoute>
          <SecureRoute path="/favourites" secure={true}>
            <Favourites />
          </SecureRoute>
          <SecureRoute path="/advert-add" secure={true}>
            <AdvertAdd />
          </SecureRoute>
          <SecureRoute path="/advert-edit/:id" secure={true}>
            <AdvertAdd edit={true} />
          </SecureRoute>
          <SecureRoute path="/advert/:id">
            <Advert />
          </SecureRoute>
          <SecureRoute path="/test">
            <div className="center-main-block">
              <div className="lang_switcher">
                <span className={`lang_switch_item ${lang === 'ua' ? 'active' : ''}`} onClick={() => dispatch(changeLang('ua'))}>ua</span>
                <br />
                <span className={`lang_switch_item ${lang === 'en' ? 'active' : ''}`} onClick={() => dispatch(changeLang('en'))}>en</span>
              </div>
              <br />
              <div><b>{lang}</b></div>
              <br />
              <Test />
            </div>
          </SecureRoute>
          <SecureRoute path="/">
            <Home />
          </SecureRoute>
        </Switch>
      </main>
      <Footer />
      {/*chat.isActive && user.user && <Chat user={user} headerHeight={headerHeight} />*/}
      <Header />
    </Router>
  );
};