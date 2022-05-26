import AxiosCall from '../../../Utils/axios';
import ErrorHandler from '../../../Utils/error-handler';


export const getCartStart = () => ({
  type: "GET_CART_START",
});

export const getCartSuccess = payload => ({
  type: "GET_CART_SUCCESS",
  payload,
});

export const getCartFail = payload => ({
  type: "GET_CART_FAIL",
  payload,
});

export const getCartCleanup = () => ({
  type: "GET_CART_CLEANUP",
});

export const getCart = payload => async dispatch => {
  try {
    dispatch(getCartStart());
    const requestObj = {
      path: 'cart',
      method: 'GET',
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(getCartSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(getCartFail(error));
  }
};
