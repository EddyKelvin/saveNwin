import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const productStart = () => ({
  type: "PRODUCT_START",
});

export const productSuccess = (payload) => ({
  type: "PRODUCT_SUCCESS",
  payload,
});

export const productFail = (payload) => ({
  type: "PRODUCT_FAIL",
  payload,
});

export const productCleanup = () => ({
  type: "PRODUCT_CLEANUP",
});

export const product = (payload) => async (dispatch) => {
  const { _id } = payload;
  try {
    dispatch(productStart());
    const requestObj = {
      path: `products/${_id}`,
      method: "GET",
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(productSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(productFail(error));
  }
};
