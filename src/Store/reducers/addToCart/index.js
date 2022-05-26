import { addToCart as initialState } from "../../initialStates";

const addToCart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART_START":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_TO_CART_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "ADD_TO_CART_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "ADD_TO_CART_CLEANUP":
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

export default addToCart;