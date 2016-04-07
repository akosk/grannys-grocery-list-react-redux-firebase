import { combineReducers } from 'redux';

import firebase from './firebaseReducer';
import grocery from './groceryReducer';
import auth from './authReducer';


const rootReducer = combineReducers({
  firebase,
  grocery,
  auth
})

export default rootReducer;
