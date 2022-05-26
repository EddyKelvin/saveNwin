import { addManyToCart as initialState } from "../../initialStates";

const addManyToCart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MANY_CARTS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "ADD_MANY_CARTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "ADD_MANY_CARTS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "ADD_MANY_CARTS_CLEANUP":
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

export default addManyToCart;