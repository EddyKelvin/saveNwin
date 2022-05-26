import { businessProgramList as initialState } from "../../initialStates";

const getProgram = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROGRAMS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_PROGRAMS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "GET_PROGRAMS_FAIL":
      return {
        ...state,
        isLoading: false,
        erro: action.payload,
      };
    case "GET_PROGRAMS_CLEANUP":
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

export default getProgram;
