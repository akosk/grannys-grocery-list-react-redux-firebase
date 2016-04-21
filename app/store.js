import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';
import Firebase from 'firebase';

import initialState from './initialState';

const logger = createLogger();
const enhancer = compose(applyMiddleware(thunk, logger));

const store = createStore(reducers, initialState, enhancer);

if (module.hot) {
  console.log('HOT MODULE!');
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
  });
}


export default store;
