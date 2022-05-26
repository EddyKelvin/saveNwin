import { clickedReferral as initialState } from "../../initialStates";

const clickedReferral = (state = initialState, action) => {
  switch (action.type) {
    case "CLICKED_REFERRAL_START":
      return {
        ...state,
        isLoading: true,
      };
    case "CLICKED_REFERRAL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "CLICKED_REFERRAL_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "CLICKED_REFERRAL_CLEANUP":
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

export default clickedReferral;
