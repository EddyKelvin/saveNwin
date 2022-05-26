import { signup as initialState } from '../../initialStates';

const signup = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_START":
      return {
        ...state,
        isLoading: true,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "SIGNUP_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "SIGNUP_CLEANUP":
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

export default signup;
