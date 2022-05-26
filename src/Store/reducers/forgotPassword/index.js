import { forgotPass as initialState } from '../../initialStates';

const forgotPass = (state = initialState, action) => {
  switch (action.type) {
    case "FORGOT_PASS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "FORGOT_PASS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "FORGOT_PASS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "FORGOT_PASS_CLEANUP":
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

export default forgotPass;
