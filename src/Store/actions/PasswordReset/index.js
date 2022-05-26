import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const passResetStart = () => ({
  type: "PASS_RESET_START",
});

export const passResetSuccess = (payload) => ({
  type: "PASS_RESET_SUCCESS",
  payload,
});

export const passResetFail = (payload) => ({
  type: "PASS_RESET_FAIL",
  payload,
});

export const passResetCleanup = () => ({
  type: "PASS_RESET_CLEANUP",
});

export const passReset = (payload, token) => async (dispatch) => {
  try {
    dispatch(passResetStart());
    const requestObj = {
      path: `users/reset-password/${token}`,
      method: "POST",
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(passResetSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(passResetFail(error));
  }
};
