import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Create from "./navigation/Create";
import Listings from "./navigation/Listings";
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker';

import configureStore from './store/configureStore';

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

const NoMatchPage = () => {
  console.log("test");
  return (
    <h3>404 - Not found</h3>
  )
}

const store = configureStore();
ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Listings} />
        <Route path="home" component={Listings} />
        <Route path="create" component={Create} />
        <Route path="edit/:id" component={Create} />
        <Route path="*" component={NoMatchPage}></Route>
      </Route>
      <Route component={NoMatchPage}></Route>

    </Router>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
