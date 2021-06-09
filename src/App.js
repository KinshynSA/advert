import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { changeLang } from "./store/langSlice.js";

import Header from './components/header/header.js';
import Registration from './components/login/registration.js';
import Login from './components/login/login.js';
import AdvertAdd from './components/advert/advertadd.js';



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
          <Route path="/">
            <div>
              <div className="lang_switcher">
                <a className={`lang_switch_item ${lang === 'ua' ? 'active' : ''}`} onClick={() => dispatch(changeLang('ua'))}>ua</a>
                <br />
                <a className={`lang_switch_item ${lang === 'en' ? 'active' : ''}`} onClick={() => dispatch(changeLang('en'))}>en</a>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <div><b>{lang}</b></div>
            </div>
          </Route>
        </Switch>
      </main>
      {/*<Header />*/}
    </Router>
  );
};