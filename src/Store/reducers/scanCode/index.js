import { scanCode as initialState } from "../../initialStates";

const scanCode = (state = initialState, action) => {
  switch (action.type) {
    case "SCAN_CODE_START":
      return {
        ...state,
        isLoading: true,
      };
    case "SCAN_CODE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "SCAN_CODE_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "SCAN_CODE_CLEANUP":
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

export default scanCode;
