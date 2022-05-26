import { getMe as initialState } from '../../initialStates';

const getMe = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ME_START":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_ME_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "GET_ME_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "GET_ME_CLEANUP":
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

export default getMe;
