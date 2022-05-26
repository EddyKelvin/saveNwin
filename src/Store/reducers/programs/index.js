import { programs as initialState } from '../../initialStates';

const programs = (state = initialState, action) => {
  switch (action.type) {
    case "PROGRAMS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "PROGRAMS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "PROGRAMS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "PROGRAMS_CLEANUP":
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

export default programs;
