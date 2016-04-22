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
      <Route component={LayoutContainer}
          path='/'
      >
        <IndexRoute component={LoginContainer}/>
        <Route component={MainContainer}
            path='/main'
        />
      </Route>
    </Router>
  </Provider>

);

export default routes;
