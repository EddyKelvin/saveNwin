import { productList as initialState } from "../../initialStates";

const productList = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_START":
      return {
        ...state,
        isLoading: true,
      };
    case "PRODUCT_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "PRODUCT_LIST_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "PRODUCT_LIST_CLEANUP":
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

export default productList;
