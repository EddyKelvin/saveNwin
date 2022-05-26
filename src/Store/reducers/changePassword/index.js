import { changePassword as initialState } from "../../initialStates";

const changePass = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PASS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "CHANGE_PASS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "CHANGE_PASS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "CHANGE_PASS_CLEANUP":
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

export default changePass;
