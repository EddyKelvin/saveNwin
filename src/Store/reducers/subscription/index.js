import { subscription as initialState } from '../../initialStates';

const sub = (state = initialState, action) => {
  switch (action.type) {
    case "SUB_START":
      return {
        ...state,
        isLoading: true,
      };
    case "SUB_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "SUB_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "SUB_CLEANUP":
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

export default sub;
