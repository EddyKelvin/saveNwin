import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const redeemCodeStart = () => ({
  type: "REDEEM_CODE_START",
});

export const redeemCodeSuccess = (payload) => ({
  type: "REDEEM_CODE_SUCCESS",
  payload,
});

export const redeemCodeFail = (payload) => ({
  type: "REDEEM_CODE_FAIL",
  payload,
});

export const redeemCodeCleanup = () => ({
  type: "REDEEM_CODE_CLEANUP",
});

export const redeemCode = (payload) => async (dispatch) => {
  try {
    dispatch(redeemCodeStart());

    const requestObj = {
      path: `qrcodes/${payload}`,
      method: "PUT",
    };

    const { message } = await AxiosCall(requestObj);

    dispatch(redeemCodeSuccess(message));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(redeemCodeFail(error));
  }
};
