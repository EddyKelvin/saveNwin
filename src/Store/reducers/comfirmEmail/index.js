import { confirmEmail as initialState } from "../../initialStates";

const confirmEmail = (state = initialState, action) => {
  switch (action.type) {
    case "CONFIRM_EMAIL_START":
      return {
        ...state,
        isLoading: true,
      };
    case "CONFIRM_EMAIL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "CONFIRM_EMAIL_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "CONFIRM_EMAIL_CLEANUP":
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

export default confirmEmail;
