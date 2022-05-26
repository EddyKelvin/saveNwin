import { userPayment as initialState } from "../../initialStates";

const userPayment = (state = initialState, action) => {
  switch (action.type) {
    case "USER_PAYMENT_START":
      return {
        ...state,
        isLoading: true,
      };
    case "USER_PAYMENT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "USER_PAYMENT_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "USER_PAYMENT_CLEANUP":
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

export default userPayment;
