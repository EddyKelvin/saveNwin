import { allNotifications as initialState } from "../../initialStates";

const AllNotifications = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_NOTIFICATIONS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "ALL_NOTIFICATIONS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "ALL_NOTIFICATIONS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "ALL_NOTIFICATIONS_CLEANUP":
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

export default AllNotifications;
