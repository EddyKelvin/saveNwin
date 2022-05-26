import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const createProductStart = () => ({
  type: "CREATE_PRODUCT_START",
});

export const createProductSuccess = (payload) => ({
  type: "CREATE_PRODUCT_SUCCESS",
  payload,
});

export const createProductFail = (payload) => ({
  type: "CREATE_PRODUCT_FAIL",
  payload,
});

export const createProductCleanup = () => ({
  type: "CREATE_PRODUCT_CLEANUP",
});

export const createProduct = (payload) => async (dispatch) => {
  try {
    dispatch(createProductStart());
    const requestObj = {
      path: "products",
      method: "POST",
      data: payload,
      contentType: "multipart/form-data",
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(createProductSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(createProductFail(error));
  }
};
