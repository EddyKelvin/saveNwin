import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const changePassStart = () => ({
  type: "CHANGE_PASS_START",
});

export const changePassSuccess = (payload) => ({
  type: "CHANGE_PASS_SUCCESS",
  payload,
});

export const changePassFail = (payload) => ({
  type: "CHANGE_PASS_FAIL",
  payload,
});

export const changePassCleanup = () => ({
  type: "CHANGE_PASS_CLEANUP",
});

export const changePass = (payload) => async (dispatch) => {
  try {
    dispatch(changePassStart());
    const requestObj = {
      path: "users/change-password",
      method: "POST",
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(changePassSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(changePassFail(error));
  }
};
