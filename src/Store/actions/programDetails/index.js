import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const programDetailsStart = () => ({
  type: "PROGRAM_DETAILS_START",
});

export const programDetailsSuccess = (payload) => ({
  type: "PROGRAM_DETAILS_SUCCESS",
  payload,
});

export const programDetailsFail = (payload) => ({
  type: "PROGRAM_DETAILS_FAIL",
  payload,
});

export const programDetailsCleanup = () => ({
  type: "PROGRAM_DETAILS_CLEANUP",
});

export const programDetails = (payload) => async (dispatch) => {
  const { _id } = payload;
  try {
    dispatch(programDetailsStart());
    const requestObj = {
      path: `programs/${_id}`,
      method: "GET",
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(programDetailsSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(programDetailsFail(error));
  }
};
