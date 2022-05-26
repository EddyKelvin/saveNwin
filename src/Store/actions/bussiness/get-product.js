import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const getProductStart = () => ({
  type: "GET_PRODUCTS_START",
});

export const getProductSuccess = (payload) => ({
  type: "GET_PRODUCTS_SUCCESS",
  payload,
});

export const getProductFail = (payload) => ({
  type: "GET_PRODUCTS_FAIL",
  payload,
});

export const getProductCleanup = () => ({
  type: "GET_PRODUCTS_CLEANUP",
});

export const getProductList = (payload) => async (dispatch) => {
  const { page, limit, title } = payload;
  try {
    dispatch(getProductStart());
    const requestObj = {
      path: `products?page=${page}&limit=${limit}${
        title ? "&title=" + title : ""
      }`,
      method: "GET",
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(getProductSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(getProductFail(error));
  }
};
