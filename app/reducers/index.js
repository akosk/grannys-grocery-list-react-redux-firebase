import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import firebase from './firebaseReducer';
import grocery from './groceryReducer';
import auth from './authReducer';


const rootReducer = combineReducers({
  firebase,
  grocery,
  auth,
  routing: routerReducer
})

export default rootReducer;
