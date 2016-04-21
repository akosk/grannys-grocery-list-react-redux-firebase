import Firebase from 'firebase';

const initialState = {
  firebase: new Firebase('https://grannys-grocery-list.firebaseio.com'),
  grocery: {
    items: [],
  },
};

export default initialState;
