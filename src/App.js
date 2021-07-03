import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { changeLang } from "./store/langSlice.js";

import Header from './components/header/header.js';
import Registration from './components/login/registration.js';
import Login from './components/login/login.js';
import Advert from './components/advert/advert.js';
import AdvertAdd from './components/advertadd/advertadd.js';
import Footer from './components/footer/footer.js';
import Test from './components/test/test.js';



export default function App() {
  const lang = useSelector((store) => store.lang.lang);
  const dispatch = useDispatch();


  return (
    <Router>
      <main className="main">
        <Switch>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/advert-add">
            <AdvertAdd />
          </Route>
          <Route path="/advert/:id">
            <Advert />
          </Route>
          <Route path="/">
            <div className="center-main-block">
              <div className="lang_switcher">
                <span className={`lang_switch_item ${lang === 'ua' ? 'active' : ''}`} onClick={() => dispatch(changeLang('ua'))}>ua</span>
                <br />
                <span className={`lang_switch_item ${lang === 'en' ? 'active' : ''}`} onClick={() => dispatch(changeLang('en'))}>en</span>
              </div>
              <br />
              <br />
              <div><b>{lang}</b></div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <Test />
            </div>
          </Route>
        </Switch>
      </main>
      <Footer />
      {/*<Header />*/}
    </Router>
  );
};