export const initialState = {
  items: [],
};

export default function grocery(state = initialState, action) {
  switch (action.type) {
    case 'GROCERY_ITEM_RECEIVED':
      return {
        ...state,
        items: [
          action.item,
          ...state.items,
        ],
      };

    case 'EDIT_GROCERY_ITEM':
      return {
        ...state,
        items: state.items.map((item, index) => ({
          ...item,
          edit: action.item.id === item.id ? true : item.edit,
        })),
      };

    case 'CANCEL_EDIT_GROCERY_ITEM':
      return {
        ...state,
        items: state.items.map((item, index) => ({
          ...item,
          edit: action.item.id === item.id ? false : item.edit,
        })),
      };

    case 'SELECT_GROCERY_ITEMS':
      return {
        ...state,
        items: state.items.map((item, index) => ({
          ...item,
          selected: action.selectedIndexes === 'all' || action.selectedIndexes.includes(index),
        })),
      };

    case 'GROCERY_ITEM_REMOVED':
      return {
        ...state,
        items: state.items.filter((item) => {
          return item.id !== action.item.key;
        }),
      };

    case 'GROCERY_ITEM_CHANGED':
      return {
        ...state,
        items: state.items.map((item, index) => {
          if (item.id !== action.item.id) return item;
          return {...action.item
          };
        }),
      };

    case 'LOGOUT_SUCCEED':
      return {
        items: [],
      };

    default:
      return state;
  }
}
