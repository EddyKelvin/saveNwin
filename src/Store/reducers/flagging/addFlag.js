import { addFlag as initialState } from "../../initialStates";

const addFlag = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FLAG_START":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_FLAG_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "ADD_FLAG_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "ADD_FLAG_CLEANUP":
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

export default addFlag;
