import { unredeemedCodes as initialState } from "../../initialStates";

const unredeemedCodes = (state = initialState, action) => {
  switch (action.type) {
    case "UNREDEEMED_CODE_START":
      return {
        ...state,
        isLoading: true,
      };
    case "UNREDEEMED_CODE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "UNREDEEMED_CODE_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "UNREDEEMED_CODE_CLEANUP":
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

export default unredeemedCodes;
