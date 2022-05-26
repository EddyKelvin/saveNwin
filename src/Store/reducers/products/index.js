import { product as initialState } from "../../initialStates";

const product = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_START":
      return {
        ...state,
        isLoading: true,
      };
    case "PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "PRODUCT_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "PRODUCT_CLEANUP":
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

export default product;
