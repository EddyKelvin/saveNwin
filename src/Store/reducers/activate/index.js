import { activate as initialState } from "../../initialStates";

const activate = (state = initialState, action) => {
  switch (action.type) {
    case "ACTIVATE_START":
      return {
        ...state,
        isLoading: true,
      };
    case "ACTIVATE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "ACTIVATE_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "ACTIVATE_CLEANUP":
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

export default activate;