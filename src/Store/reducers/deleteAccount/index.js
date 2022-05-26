import { deleteAccount as initialState } from "../../initialStates";

const deleteAccount = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_ACCOUNT_START":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_ACCOUNT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "DELETE_ACCOUNT_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "DELETE_ACCOUNT_CLEANUP":
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

export default deleteAccount;
