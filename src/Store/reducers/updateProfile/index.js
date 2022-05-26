import { updateProfile as initialState } from '../../initialStates';

const updateProfile = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_START":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        data: action.payload,
      };
    case "UPDATE_PROFILE_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "UPDATE_PROFILE_CLEANUP":
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

export default updateProfile;
