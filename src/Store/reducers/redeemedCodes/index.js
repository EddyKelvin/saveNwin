import { redeemedCodes as initialState } from "../../initialStates";

const redeemedCodes = (state = initialState, action) => {
  switch (action.type) {
    case "REDEEMED_CODE_START":
      return {
        ...state,
        isLoading: true,
      };
    case "REDEEMED_CODE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "REDEEMED_CODE_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "REDEEMED_CODE_CLEANUP":
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

export default redeemedCodes;
