import Firebase from 'firebase';
import {browserHistory} from 'react-router';

export function openLoginPopup() {
  return {
    type: 'OPEN_LOGIN_POPUP'
  };
}

export function loginError(error) {
  return {
    type: 'LOGIN_ERROR',
    error
  };
}

export function loginSucceed(user, token) {
  return {
    type: 'LOGIN_SUCCEED',
    user,
    token
  };
}

export function logout() {
  return (dispatch, getState) => {
    Firebase.auth().signOut().then(()=> {
      dispatch({
        type: 'LOGOUT_SUCCEED'
      });
    }, function (error) {
      throw(error);
    });
  };
}

export function redirectToLogin() {
  return (dispatch, getState) => {
    browserHistory.push('/');
    dispatch({
      type: 'REDIRECT_TO_LOGIN_SUCCEED'
    });
  };
}
