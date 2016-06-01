import Firebase from 'firebase';
import axios from 'axios';
import _ from 'lodash';

import {getRootRef} from '../utils/firebase_utils';

export function editGroceryItem(item) {
  return {
    type: 'EDIT_GROCERY_ITEM',
    item,
  };
}

export function cancelEditGroceryItem(item) {
  return {
    type: 'CANCEL_EDIT_GROCERY_ITEM',
    item,
  };
}

export function queryAllGroceryItems() {
  return (dispatch, getState) => {
    const ref = getRootRef();

    ref.once('value').then((snap) => {
      snap.forEach(item=> {
        const id = item.key;
        dispatch({
          type: 'GROCERY_ITEM_RECEIVED',
          item: {
            id,
            ...item.val()
          },
        });
      });
    });

    const refAfterNow = ref.orderByChild('timestamp').startAt(Date.now());

    ref.on('child_removed', (msg) => {
      const msgVal = msg.val();
      msgVal.key = msg.key;
      dispatch({
        type: 'GROCERY_ITEM_REMOVED',
        item: { ...msgVal },
      });
    });

    refAfterNow.on('child_added', (snap) => {
      const val = snap.val();
      const id = snap.key;
      dispatch({
        type: 'GROCERY_ITEM_RECEIVED',
        item: {
          id,
          ...val,
        },
      });
    });

    ref.on('child_changed', (msg) => {
      const val = msg.val();
      const id = msg.key;
      dispatch({
        type: 'GROCERY_ITEM_CHANGED',
        item: {
          id,
          ...val,
        },
      });
    });
  };
}

export function addGroceryItem(item) {
  return (dispatch, getState) => {
    const ref = getRootRef();

    axios.get('https://www.googleapis.com/customsearch/v1', {
           params: {
             key: 'AIzaSyB4cC2F-GAMBfZbFIDQu4D0VcarL7SYAro',
             cx: '014145426969181454447:3iund3-mwui',
             searchType: 'image',
             q: item.name,
           },
         })
         .then((response) => {
           const imageUrl = _.get(response.data, 'items[0].image.thumbnailLink');
           ref.push({
             ...item,
             timestamp: Firebase.database.ServerValue.TIMESTAMP,
             imageUrl,
           });
         })
         .catch((response) => {
           ref.push(item);
         });
  };
}

export function doneEditGroceryItem(item) {
  return (dispatch, getState) => {
    const ref = getRootRef().child(item.id);

    axios.get('https://www.googleapis.com/customsearch/v1', {
           params: {
             key: 'AIzaSyB4cC2F-GAMBfZbFIDQu4D0VcarL7SYAro',
             cx: '014145426969181454447:3iund3-mwui',
             searchType: 'image',
             q: item.name,
           },
         })
         .then((response) => {
           const imageUrl = _.get(response.data, 'items[0].image.thumbnailLink');
           ref.update({
             ...item,
             imageUrl,
           });
           dispatch({
             type: 'CANCEL_EDIT_GROCERY_ITEM',
             item,
           });
         })
         .catch((response) => {
         });
  };
}

export function selectGroceryItem(item, isSelected) {
  return {
    type: 'SELECT_GROCERY_ITEM',
    item,
    isSelected
  };
}

export function selectAllGroceryItem(isSelected) {
  return {
    type: 'SELECT_ALL_GROCERY_ITEM',
    isSelected
  };
}



export function deleteSelectedGroceryItems(rowKeys) {
  return (dispatch, getState) => {
    const { grocery } = getState();
    grocery.items.forEach((item) => {
      if (item.selected === true) {
        const ref = getRootRef().child(item.id);
        ref.remove();
      }
    });
  };
}
