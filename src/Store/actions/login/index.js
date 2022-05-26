import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";
// import { addManyCart } from "../addManyCarts";

import { setAuth } from "../auth";

export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (payload) => ({
  type: "LOGIN_SUCCESS",
  payload,
});

export const loginFail = (payload) => ({
  type: "LOGIN_FAIL",
  payload,
});

export const loginCleanup = () => ({
  type: "LOGIN_CLEANUP",
});

export const login = (payload) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const requestObj = {
      path: "users/login",
      method: "POST",
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    localStorage.setItem("authToken", data.token);
    dispatch(loginSuccess(data));
    dispatch(setAuth());
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(loginFail(error));
  }
};
