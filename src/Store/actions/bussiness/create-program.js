import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const createProgramStart = () => ({
  type: "CREATE_PROGRAM_START",
});

export const createProgramSuccess = (payload) => ({
  type: "CREATE_PROGRAM_SUCCESS",
  payload,
});

export const createProgramFail = (payload) => ({
  type: "CREATE_PROGRAM_FAIL",
  payload,
});

export const createProgramCleanup = () => ({
  type: "CREATE_PROGRAM_CLEANUP",
});

export const createProgram = (payload) => async (dispatch) => {
  try {
    dispatch(createProgramStart());
    const requestObj = {
      path: "programs",
      method: "POST",
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(createProgramSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(createProgramFail(error));
  }
};
