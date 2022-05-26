import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const deleteFlagStart = () => ({
  type: "DELETE_FLAG_START",
});

export const deleteFlagSuccess = (payload) => ({
  type: "DELETE_FLAG_SUCCESS",
  payload,
});

export const deleteFlagFail = (payload) => ({
  type: "DELETE_FLAG_FAIL",
  payload,
});

export const deleteFlagCleanup = () => ({
  type: "DELETE_FLAG_CLEANUP",
});

export const deleteFlag = (payload) => async (dispatch) => {
  const { programId } = payload;

  try {
    dispatch(deleteFlagStart());
    const requestObj = {
      path: `programs/flag/${programId}`,
      method: "DELETE",
    };

    const { data } = await AxiosCall(requestObj);
    dispatch(deleteFlagSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(deleteFlagFail(error));
  }
};
