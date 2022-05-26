import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const addManyCartStart = () => ({
  type: "ADD_MANY_CARTS_START",
});

export const addManyCartSuccess = (payload) => ({
  type: "ADD_MANY_CARTS_SUCCESS",
  payload,
});

export const addManyCartFail = (payload) => ({
  type: "ADD_MANY_CARTS_FAIL",
  payload,
});

export const addManyCartCleanup = () => ({
  type: "ADD_MANY_CARTS_CLEANUP",
});

export const addManyCart = (payload) => async (dispatch) => {
  try {
    dispatch(addManyCartStart());
    const requestObj = {
      path: "cart/add",
      method: "POST",
      data: { cartItem: payload },
    };
    const { data } = await AxiosCall(requestObj);
    localStorage.setItem('cart', JSON.stringify(data));
    dispatch(addManyCartSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(addManyCartFail(error));
  }
};

