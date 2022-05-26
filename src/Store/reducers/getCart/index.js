import { getCart as initialState } from '../../initialStates';

const getCart = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART_START":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_CART_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "GET_CART_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "GET_CART_CLEANUP":
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

export default getCart;
