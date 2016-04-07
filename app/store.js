import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Firebase from 'firebase';

const initialState = {
  firebase: new Firebase('https://grannys-grocery-list.firebaseio.com')
};

const enhancer = compose(applyMiddleware(thunk));
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducers, initialState, enhancer);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
  });
}

export default store;
