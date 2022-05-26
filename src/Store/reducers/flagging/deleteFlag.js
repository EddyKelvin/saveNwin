import { deleteFlag as initialState } from "../../initialStates";

const deleteFlag = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_FLAG_START":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_FLAG_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "DELETE_FLAG_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "DELETE_FLAG_CLEANUP":
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

export default deleteFlag;
