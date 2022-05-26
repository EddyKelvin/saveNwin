import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const programsStart = () => ({
  type: "PROGRAMS_START",
});

export const programsSuccess = (payload) => ({
  type: "PROGRAMS_SUCCESS",
  payload,
});

export const programsFail = (payload) => ({
  type: "PROGRAMS_FAIL",
  payload,
});

export const programsCleanup = () => ({
  type: "PROGRAMS_CLEANUP",
});

export const programsList = (payload) => async (dispatch) => {
  const { minDiscount, page, limit, state, city, budget, startDate, endDate } =
    payload;

  try {
    dispatch(programsStart());
    const requestObj = {
      path: `programs/search?page=${page}&limit=${limit}${
        minDiscount ? "&minDiscount=" + minDiscount : ""
      }${city ? "&city=" + city : ""}${state ? "&state=" + state : ""}${
        budget ? "&budget=" + budget : ""
      }${startDate ? "&startDate=" + startDate : ""}${
        endDate ? "&endDate=" + endDate : ""
      }`,
      method: "GET",
    };

    const { data } = await AxiosCall(requestObj);
    dispatch(programsSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(programsFail(error));
  }
};
