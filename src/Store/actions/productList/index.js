import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const productListStart = () => ({
  type: "PRODUCT_LIST_START",
});

export const productListSuccess = (payload) => ({
  type: "PRODUCT_LIST_SUCCESS",
  payload,
});

export const productListFail = (payload) => ({
  type: "PRODUCT_LIST_FAIL",
  payload,
});

export const productListCleanup = () => ({
  type: "PRODUCT_LIST_CLEANUP",
});

export const productList = (payload) => async (dispatch) => {
  const { productType, page, limit, state, city, title } = payload;

  try {
    dispatch(productListStart());
    const requestObj = {
      path: `products/search?page=${page}&limit=${limit}${
        productType ? "&productType=" + productType : ""
      }${city ? "&city=" + city : ""}${state ? "&state=" + state : ""}${
        title ? "&title=" + title : ""
      }`,

      method: "GET",
    };

    const { data } = await AxiosCall(requestObj);
    dispatch(productListSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(productListFail(error));
  }
};
