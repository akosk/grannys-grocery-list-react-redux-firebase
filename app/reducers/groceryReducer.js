export const initialState = {items: [
]};

export default function grocery(state = initialState, action) {
  switch (action.type) {
    case "GROCERY_ITEM_RECEIVED":
      return {
        ...state,
        items: [
          action.item,
          ...state.items]
      };

    case "SELECT_GROCERY_ITEMS":
      return {
        ...state,
        items: state.items.map((item, index)=> {
          return {
            ...item,
            selected: action.selectedIndexes==='all' || action.selectedIndexes.includes(index)
          }
        })
      };

    case "GROCERY_ITEM_REMOVED":
      return {
        ...state,
        items: state.items.filter((item)=> {
          return item.id!==action.item.key;
        })
      };

    case "LOGOUT_SUCCEED":
      return {
        items: [
        ]
      };

    default:
      return state
  }
}
