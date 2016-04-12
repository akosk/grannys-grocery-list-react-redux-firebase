export const initialState = {
  popupOpened: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {

    case "OPEN_LOGIN_POPUP":
      return {
        ...state,
        popupOpened: true
      };

    case "LOGIN_ERROR":
      const error=action.error;
      return {
        ...state,
        popupOpened: false,
        error
      };

    case "LOGIN_SUCCEED":
      const user=action.user;
      return {
        ...state,
        user,
        popupOpened: false,
      };

    case "LOGOUT_SUCCEED":
      return {
        ...initialState
      };

    default:
      return state
  }
}
