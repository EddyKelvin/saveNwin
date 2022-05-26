import { businessProductList as initialState } from "../../initialStates";

const getProduct = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "GET_PRODUCTS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "GET_PRODUCTS_CLEANUP":
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

export default getProduct;
