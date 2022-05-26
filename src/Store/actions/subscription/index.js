import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const subStart = () => ({
  type: "SUB_START",
});

export const subSuccess = (payload) => ({
  type: "SUB_SUCCESS",
  payload,
});

export const subFail = (payload) => ({
  type: "SUB_FAIL",
  payload,
});

export const subCleanup = () => ({
  type: "SUB_CLEANUP",
});

export const sub = (payload) => async (dispatch) => {
  try {
    dispatch(subStart());
    const requestObj = {
      path: "subscribe",
      method: "POST",
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(subSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(subFail(error));
  }
};
