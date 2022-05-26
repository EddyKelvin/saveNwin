import { changeEmail as initialState } from "../../initialStates";

const changeEmail = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_EMAIL_START":
      return {
        ...state,
        isLoading: true,
      };
    case "CHANGE_EMAIL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "CHANGE_EMAIL_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "CHANGE_EMAIL_CLEANUP":
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

export default changeEmail;
