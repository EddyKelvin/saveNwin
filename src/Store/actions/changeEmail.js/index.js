import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const changeEmailStart = () => ({
  type: "CHANGE_EMAIL_START",
});

export const changeEmailSuccess = (payload) => ({
  type: "CHANGE_EMAIL_SUCCESS",
  payload,
});

export const changeEmailFail = (payload) => ({
  type: "CHANGE_EMAIL_FAIL",
  payload,
});

export const changeEmailCleanup = () => ({
  type: "CHANGE_EMAIL_CLEANUP",
});

export const changeEmail = (payload) => async (dispatch) => {
  try {
    dispatch(changeEmailStart());
    const requestObj = {
      path: "users/email",
      method: "POST",
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(changeEmailSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(changeEmailFail(error));
  }
};
