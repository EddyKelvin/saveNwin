import { getProductProgram as initialState } from "../../initialStates";

const productProgram = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_PROGRAM_START":
      return {
        ...state,
        isLoading: true,
      };
    case "PRODUCT_PROGRAM_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "PRODUCT_PROGRAM_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "PRODUCT_PROGRAM_CLEANUP":
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

export default productProgram;
