import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const unredeemedCodesStart = () => ({
  type: "UNREDEEMED_CODE_START",
});

export const unredeemedCodesSuccess = (payload) => ({
  type: "UNREDEEMED_CODE_SUCCESS",
  payload,
});

export const unredeemedCodesFail = (payload) => ({
  type: "UNREDEEMED_CODE_FAIL",
  payload,
});

export const unredeemedCodesCleanup = () => ({
  type: "UNREDEEMED_CODE_CLEANUP",
});

export const unredeemedCodes = (payload) => async (dispatch) => {
  const { page, limit } = payload;
  try {
    dispatch(unredeemedCodesStart());

    const requestObj = {
      path: `qrcodes/open?page=${page}&limit=${limit}`,
      method: "GET",
    };

    const { data } = await AxiosCall(requestObj);

    dispatch(unredeemedCodesSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(unredeemedCodesFail(error));
  }
};
