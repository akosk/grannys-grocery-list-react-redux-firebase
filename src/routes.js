import React from 'react';
import { Route, IndexRoute } from 'react-router';
import _ from 'lodash';


// Components
import LayoutContainer from './containers/LayoutContainer';
import LoginContainer from './containers/LoginContainer';
import MainContainer from './containers/MainContainer';


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
      <IndexRoute component={LoginContainer}/>
      <Route path="main" component={MainContainer} onEnter={requireAuthentication}/>
    </Route>
  );
};

export default createRoutes;


