import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const activateStart = () => ({
  type: "ACTIVATE_START",
});

export const activateSuccess = (payload) => ({
  type: "ACTIVATE_SUCCESS",
  payload,
});

export const activateFail = (payload) => ({
  type: "ACTIVATE_FAIL",
  payload,
});

export const activateCleanup = () => ({
  type: "ACTIVATE_CLEANUP",
});

export const activate = (payload) => async (dispatch) => {
  try {
    dispatch(activateStart());
    const requestObj = {
      path: `users/activate/${payload}`,
      method: "GET",
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(activateSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(activateFail(error));
  }
};
