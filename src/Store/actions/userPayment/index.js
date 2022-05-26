import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const createUserPaymentStart = () => ({
  type: "USER_PAYMENT_START",
});

export const createUserPaymentSuccess = (payload) => ({
  type: "USER_PAYMENT_SUCCESS",
  payload,
});

export const createUserPaymentFail = (payload) => ({
  type: "USER_PAYMENT_FAIL",
  payload,
});

export const createUserPaymentCleanup = () => ({
  type: "USER_PAYMENT_CLEANUP",
});

export const createUserPayment = (payload) => async (dispatch) => {
  try {
    dispatch(createUserPaymentStart());
    const requestObj = {
      path: "users/buy",
      method: "POST",
      data: payload,
    };
    const { data } = await AxiosCall(requestObj);

    dispatch(createUserPaymentSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(createUserPaymentFail(error));
  }
};
