import AxiosCall from '../../../Utils/axios';
import ErrorHandler from '../../../Utils/error-handler';


export const forgotPassStart = () => ({
  type: "FORGOT_PASS_START",
});

export const forgotPassSuccess = payload => ({
  type: "FORGOT_PASS_SUCCESS",
  payload,
});

export const forgotPassFail = payload => ({
  type: "FORGOT_PASS_FAIL",
  payload,
});

export const forgotPassCleanup = () => ({
  type: "FORGOT_PASS_CLEANUP",
});

export const forgotPass = payload => async dispatch => {
  try {
    dispatch(forgotPassStart());
    const requestObj = {
      path: 'users/reset-password',
      method: 'POST',
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(forgotPassSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(forgotPassFail(error));
  }
};
