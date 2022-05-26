import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const deleteAccountStart = () => ({
  type: "DELETE_ACCOUNT_START",
});

export const deleteAccountSuccess = (payload) => ({
  type: "DELETE_ACCOUNT_SUCCESS",
  payload,
});

export const deleteAccountFail = (payload) => ({
  type: "DELETE_ACCOUNT_FAIL",
  payload,
});

export const deleteAccountCleanup = () => ({
  type: "DELETE_ACCOUNT_CLEANUP",
});

export const deleteAccount = (payload) => async (dispatch) => {
  try {
    dispatch(deleteAccountStart());
    const requestObj = {
      path: "users",
      method: "DELETE",
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(deleteAccountSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(deleteAccountFail(error));
  }
};
