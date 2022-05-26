import AxiosCall from '../../../Utils/axios';
import ErrorHandler from '../../../Utils/error-handler';


export const updateProfileStart = () => ({
  type: "UPDATE_PROFILE_START",
});

export const updateProfileSuccess = payload => ({
  type: "UPDATE_PROFILE_SUCCESS",
  payload,
});

export const updateProfileFail = payload => ({
  type: "UPDATE_PROFILE_FAIL",
  payload,
});

export const updateProfileCleanup = () => ({
  type: "UPDATE_PROFILE_CLEANUP",
});

export const updateProfile = payload => async dispatch => {
  try {
    dispatch(updateProfileStart());
    const requestObj = {
      path: 'users',
      method: 'PATCH',
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(updateProfileSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(updateProfileFail(error));
  }
};
