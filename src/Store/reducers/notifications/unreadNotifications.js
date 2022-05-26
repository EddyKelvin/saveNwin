import { unreadNotifications as initialState } from "../../initialStates";

const UnreadNotifications = (state = initialState, action) => {
  switch (action.type) {
    case "UNREAD_NOTIFICATIONS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "UNREAD_NOTIFICATIONS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "UNREAD_NOTIFICATIONS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "UNREAD_NOTIFICATIONS_CLEANUP":
      return {
        ...state,
        isLoading: false,
        isSuccessful: false,
        error: null,
      };
    default:
      return state;
  }
};

export default UnreadNotifications;
