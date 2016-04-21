import { routerMiddleware, push } from 'react-router-redux';

export function openLoginPopup() {
  return {
    type: 'OPEN_LOGIN_POPUP',
  };
}

export function loginError(error) {
  return {
    type: 'LOGIN_ERROR',
    error,
  };
}

export function loginSucceed(user) {
  return {
    type: 'LOGIN_SUCCEED',
    user,
  };
}

export function logout() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.unauth();
    dispatch({
      type: 'LOGOUT_SUCCEED',
    });
  };
}

export function redirectToLogin(router) {
  return (dispatch, getState) => {
    router.push('/');
    dispatch({
      type: 'REDIRECT_TO_LOGIN_SUCCEED',
    });
  };
}
