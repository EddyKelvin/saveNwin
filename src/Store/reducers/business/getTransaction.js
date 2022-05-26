import { businessTransaction as initialState } from "../../initialStates";

const getTransaction = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_TRANSACTIONS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "GET_TRANSACTIONS_FAIL":
      return {
        ...state,
        isLoading: false,
        erro: action.payload,
      };
    case "GET_TRANSACTIONS_CLEANUP":
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

export default getTransaction;
