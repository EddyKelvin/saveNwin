import { passReset as initialState } from '../../initialStates';

const passReset = (state = initialState, action) => {
  switch (action.type) {
    case "PASS_RESET_START":
      return {
        ...state,
        isLoading: true,
      };
    case "PASS_RESET_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "PASS_RESET_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "PASS_RESET_CLEANUP":
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

export default passReset;
