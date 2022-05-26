import { programDetails as initialState } from "../../initialStates";

const programDetails = (state = initialState, action) => {
  switch (action.type) {
    case "PROGRAM_DETAILS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "PROGRAM_DETAILS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "PROGRAM_DETAILS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "PROGRAM_DETAILS_CLEANUP":
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

export default programDetails;
