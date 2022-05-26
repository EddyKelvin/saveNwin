import { users as initialState } from '../../initialStates';

const users = (state = initialState, action) => {
  switch (action.type) {
    case "USERS_START":
      return {
        ...state,
        isLoading: true,
      };
    case "USERS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "USERS_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "USERS_CLEANUP":
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

export default users;
