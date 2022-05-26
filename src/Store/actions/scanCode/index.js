import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const scanCodeStart = () => ({
  type: "SCAN_CODE_START",
});

export const scanCodeSuccess = (payload) => ({
  type: "SCAN_CODE_SUCCESS",
  payload,
});

export const scanCodeFail = (payload) => ({
  type: "SCAN_CODE_FAIL",
  payload,
});

export const scanCodeCleanup = () => ({
  type: "SCAN_CODE_CLEANUP",
});

export const scanCode = (payload) => async (dispatch) => {
  const result = payload;
  try {
    dispatch(scanCodeStart());

    const requestObj = {
      path: `qrcodes/${result}`,
      method: "GET",
      data: payload,
    };

    const { data } = await AxiosCall(requestObj);

    dispatch(scanCodeSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(scanCodeFail(error));
  }
};

// 61329f95160d33001de4f948
