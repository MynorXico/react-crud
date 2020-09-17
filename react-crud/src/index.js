import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Create from "./navigation/Create";
import Listings from "./navigation/Listings";

import * as serviceWorker from './serviceWorker';

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path = "/" component = {App}>
      <IndexRoute component={Listings} />
      <Route path="home" component={Listings}/>
      <Route path="create" component={Create} />
    </Route>
    
  </Router>
),document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
