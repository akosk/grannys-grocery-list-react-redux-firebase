import { routerMiddleware, push } from 'react-router-redux'

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

export function loginSucceed(user) {
  return {
    type: 'LOGIN_SUCCEED',
    user
  };
}

export function logout() {
  return (dispatch, getState)=> {
    dispatch({
      type: 'LOGOUT_SUCCEED'
    });
  }
}

export function redirectToLogin(router) {
  return (dispatch, getState)=> {
    router.push('/');
    dispatch({
      type: 'REDIRECT_TO_LOGIN_SUCCEED'
    });
  }
}

export function queryAllGroceryItems() {
  return (dispatch, getState)=> {
    const {firebase}=getState();
    const ref = firebase.child('items');
    ref.on("child_added", function (snap) {
      console.log("Data received ", snap.val());
      var val = snap.val();
      var id = snap.key();
      dispatch({
        type: 'GROCERY_ITEM_RECEIVED',
        item: {
          id,
          ...val
        },
      });
    });

  }
}

export function addGroceryItem(item) {
  return (dispatch, getState)=> {
    const {firebase}=getState();
    const ref = firebase.child('items');
    let newItemRef = ref.push(item);
  }
}

export function selectGroceryItems(selectedIndexes) {
  return {
    type: "SELECT_GROCERY_ITEMS",
    selectedIndexes
  }
}

export function deleteSelectedGroceryItems() {
  return (dispatch, getState)=> {
    const {firebase}=getState();
    const ref = firebase.child('items');

    ref.orderByChild("selected").equalTo(true).once("value",
      (snapshot)=> {
        snapshot.forEach((item)=> {
          item.ref().remove();
        });
      });
  }
}


