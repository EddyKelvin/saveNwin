import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const confirmEmailStart = () => ({
  type: "CONFIRM_EMAIL_START",
});

export const confirmEmailSuccess = (payload) => ({
  type: "CONFIRM_EMAIL_SUCCESS",
  payload,
});

export const confirmEmailFail = (payload) => ({
  type: "CONFIRM_EMAIL_FAIL",
  payload,
});

export const confirmEmailCleanup = () => ({
  type: "CONFIRM_EMAIL_CLEANUP",
});

export const confirmEmail = (payload) => async (dispatch) => {
  try {
    dispatch(confirmEmailStart());
    const requestObj = {
      path: `users/change-email/${payload}`,
      method: "GET",
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(confirmEmailSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(confirmEmailFail(error));
  }
};
