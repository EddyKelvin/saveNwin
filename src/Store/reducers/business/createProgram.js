import { createProgram as initialState } from "../../initialStates";

const createProgram = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_PROGRAM_START":
      return {
        ...state,
        isLoading: true,
      };
    case "CREATE_PROGRAM_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "CREATE_PROGRAM_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "CREATE_PROGRAM_CLEANUP":
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

export default createProgram;
