import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const getTransactionStart = () => ({
  type: "GET_TRANSACTIONS_START",
});

export const getTransactionSuccess = (payload) => ({
  type: "GET_TRANSACTIONS_SUCCESS",
  payload,
});

export const getTransactionFail = (payload) => ({
  type: "GET_TRANSACTIONS_FAIL",
  payload,
});

export const getTransactionCleanup = () => ({
  type: "GET_TRANSACTIONS_CLEANUP",
});

export const getTransaction = (payload) => async (dispatch) => {
  try {
    dispatch(getTransactionStart());
    const requestObj = {
      path: `users/transactions?limit=20${
        payload ? "&transactionID=" + payload : ""
      }`,
      method: "GET",
    };
    const { data } = await AxiosCall(requestObj);

    dispatch(getTransactionSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(getTransactionFail(error));
  }
};
