import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const getProgramStart = () => ({
  type: "GET_PROGRAMS_START",
});

export const getProgramSuccess = (payload) => ({
  type: "GET_PROGRAMS_SUCCESS",
  payload,
});

export const getProgramFail = (payload) => ({
  type: "GET_PROGRAMS_FAIL",
  payload,
});

export const getProgramCleanup = () => ({
  type: "GET_PROGRAMS_CLEANUP",
});

export const getProgramList = (payload) => async (dispatch) => {
  const { page, limit, title } = payload;

  try {
    dispatch(getProgramStart());
    const requestObj = {
      path: `programs?page=${page}&limit=${limit}${
        title ? "&title=" + title : ""
      }`,
      method: "GET",
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(getProgramSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(getProgramFail(error));
  }
};
