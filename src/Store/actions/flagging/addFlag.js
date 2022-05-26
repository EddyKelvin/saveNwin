import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const addFlagStart = () => ({
  type: "ADD_FLAG_START",
});

export const addFlagSuccess = (payload) => ({
  type: "ADD_FLAG_SUCCESS",
  payload,
});

export const addFlagFail = (payload) => ({
  type: "ADD_FLAG_FAIL",
  payload,
});

export const addFlagCleanup = () => ({
  type: "ADD_FLAG_CLEANUP",
});

export const addFlag = (payload) => async (dispatch) => {
  const { programId, msg } = payload;

  try {
    dispatch(addFlagStart());
    const requestObj = {
      path: `programs/flag/${programId}`,
      method: "POST",
      data: msg,
    };

    const { data } = await AxiosCall(requestObj);
    dispatch(addFlagSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(addFlagFail(error));
  }
};
