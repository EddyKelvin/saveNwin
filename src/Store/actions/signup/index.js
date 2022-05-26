import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const signupStart = () => ({
  type: "SIGNUP_START",
});

export const signupSuccess = (payload) => ({
  type: "SIGNUP_SUCCESS",
  payload,
});

export const signupFail = (payload) => ({
  type: "SIGNUP_FAIL",
  payload,
});

export const signupCleanup = () => ({
  type: "SIGNUP_CLEANUP",
});

export const signup = (payload) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const requestObj = {
      path: "users",
      method: "POST",
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(signupSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(signupFail(error));
  }
};
