import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const redeemedCodesStart = () => ({
  type: "REDEEMED_CODE_START",
});

export const redeemedCodesSuccess = (payload) => ({
  type: "REDEEMED_CODE_SUCCESS",
  payload,
});

export const redeemedCodesFail = (payload) => ({
  type: "REDEEMED_CODE_FAIL",
  payload,
});

export const redeemedCodesCleanup = () => ({
  type: "REDEEMED_CODE_CLEANUP",
});

export const redeemedCodes = (payload) => async (dispatch) => {
  const { page, limit } = payload;
  try {
    dispatch(redeemedCodesStart());

    const requestObj = {
      path: `qrcodes/redeemed?page=${page}&limit=${limit}`,
      method: "GET",
    };

    const { data } = await AxiosCall(requestObj);

    dispatch(redeemedCodesSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(redeemedCodesFail(error));
  }
};
