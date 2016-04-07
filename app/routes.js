import 'babel-polyfill'
import React from 'react';
import {hashHistory, Router, Route, IndexRoute} from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

//Components
import Layout from './components/Layout';
import LoginContainer from './containers/LoginContainer';
import Home from './components/Home';

let routes = (
  <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={LoginContainer}/>
        </Route>
      </Router>
  </Provider>

);

export default routes;
