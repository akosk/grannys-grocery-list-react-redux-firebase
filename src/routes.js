import React from 'react';
import { Route, IndexRoute } from 'react-router';
import _ from 'lodash';

import LayoutContainer from './components/LayoutContainer';
import LoginPage from './components/auth/LoginPage';
import GroceryPage from './components/grocery/GroceryPage';

const createRoutes = (store)=> {

  const requireAuthentication = (nextState, replace)=> {
    const state = store.getState();
    const isAuthenticated = _.has(state, 'auth.user.uid');
    if (!isAuthenticated) {
      replace('/');
    }
  };

  return (
    <Route path="/" component={LayoutContainer}>
      <IndexRoute component={LoginPage}/>
      <Route path="main" component={GroceryPage} onEnter={requireAuthentication}/>
    </Route>
  );
};

export default createRoutes;

