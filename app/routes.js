import 'babel-polyfill';
import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import store from './store';

// Components
import LayoutContainer from './containers/LayoutContainer';
import LoginContainer from './containers/LoginContainer';
import MainContainer from './containers/MainContainer';

const history = syncHistoryWithStore(browserHistory, store);

const routes = (
  <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={LayoutContainer}>
          <IndexRoute component={LoginContainer}/>
          <Route path="/main" component={MainContainer}/>
        </Route>
      </Router>
  </Provider>

);

export default routes;
