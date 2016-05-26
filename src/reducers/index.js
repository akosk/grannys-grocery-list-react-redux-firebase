import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import grocery from './groceryReducer';
import auth from './authReducer';


const rootReducer = combineReducers({
  grocery,
  auth,
  routing: routerReducer,
});

export default rootReducer;
