import { routerMiddleware, push } from 'react-router-redux'
import axios from 'axios';
import _ from 'lodash';

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
    const {firebase}=getState();
    firebase.unauth();
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

    ref.on("child_removed", ((msg) => {
      let msgVal = msg.val();
      msgVal.key = msg.key();
      dispatch({
        type: 'GROCERY_ITEM_REMOVED',
        item: { ...msgVal },
      });
    }));


    ref.on("child_added", function (snap) {
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

    axios.get('https://www.googleapis.com/customsearch/v1', {
           params: {
             key: 'AIzaSyB4cC2F-GAMBfZbFIDQu4D0VcarL7SYAro',
             cx: '014145426969181454447:3iund3-mwui',
             searchType: 'image',
             q: item.name,
           }
         })
         .then(function (response) {
           item.imageUrl = _.get(response.data, 'items[0].image.thumbnailLink');
           let newItemRef = ref.push(item);
         })
         .catch(function (response) {
           let newItemRef = ref.push(item);
         });


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
    const {firebase, grocery}=getState();
    grocery.items.forEach((item)=> {
      if (item.selected === true) {
        let ref = firebase.child('items/' + item.id);
        ref.remove();
      }
    });
  }
}


