import { createProduct as initialState } from "../../initialStates";

const createProduct = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_PRODUCT_START":
      return {
        ...state,
        isLoading: true,
      };
    case "CREATE_PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "CREATE_PRODUCT_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "CREATE_PRODUCT_CLEANUP":
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

export default createProduct;
