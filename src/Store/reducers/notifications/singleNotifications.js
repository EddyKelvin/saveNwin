import { allNotifications as initialState } from "../../initialStates";

const SingleNotifications = (state = initialState, action) => {
  switch (action.type) {
    case "SINGLE_NOTIFICATIONS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "SINGLE_NOTIFICATIONS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "SINGLE_NOTIFICATIONS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "SINGLE_NOTIFICATIONS_CLEANUP":
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

export default SingleNotifications;
