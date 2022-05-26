import { redeemCode as initialState } from "../../initialStates";

const redeemCode = (state = initialState, action) => {
  switch (action.type) {
    case "REDEEM_CODE_START":
      return {
        ...state,
        isLoading: true,
      };
    case "REDEEM_CODE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "REDEEM_CODE_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "REDEEM_CODE_CLEANUP":
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

export default redeemCode;
