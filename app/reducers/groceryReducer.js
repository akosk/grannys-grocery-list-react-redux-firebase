export const initialState = {};

export default function grocery(state = initialState, action) {
  switch (action.type) {
    case "GROCERY_ITEM_RECEIVED":
      return {
        ...state,
        items: state.items.concat(action.item)
      };

    case "SELECT_GROCERY_ITEMS":
      return {
        ...state,
        items: state.items.map((item, index)=> {
          return {
            ...item,
            selected: action.selectedIndexes.includes(index)
          }
        })
      };
    default:
      return state
  }
}
