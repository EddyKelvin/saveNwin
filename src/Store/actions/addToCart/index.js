import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

const addToCartStart = () => ({
  type: "ADD_TO_CART_START",
});

const addToCartSuccess = (payload) => ({
  type: "ADD_TO_CART_SUCCESS",
  payload,
});

const addToCartFail = (payload) => ({
  type: "ADD_TO_CART_FAIL",
  payload,
});

export const addToCartCleanup = () => ({
  type: "ADD_TO_CART_CLEANUP",
});

export const addToCart = (payload) => async (dispatch) => {
  const isLoggedIn = localStorage.getItem("authToken");
  dispatch(addToCartStart());

  if (payload.type === "add") {
    try {
      if (isLoggedIn) {
        const requestObj = {
          path: "cart/",
          method: "POST",
          data: { _id: payload.id },
        };
        const { data } = await AxiosCall(requestObj);
        dispatch(addToCartSuccess(data));
        localStorage.setItem("cart", JSON.stringify(data));
      } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
          cart = [];
        }
        const newCart = [...cart, payload.id];
        localStorage.setItem("cart", JSON.stringify(newCart));
      }

      dispatch(addToCartSuccess());
    } catch (err) {
      const error = ErrorHandler(err);
      dispatch(addToCartFail(error));
    }
  } else if (payload.type === "remove")
    try {
      if (isLoggedIn) {
        const requestObj = {
          path: `cart/${payload.id}`,
          method: "DELETE",
        };
        const { data } = await AxiosCall(requestObj);
        dispatch(addToCartSuccess(data));
        localStorage.setItem("cart", JSON.stringify(data));
      } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        const newCart = cart.filter((item) => item !== payload.id);
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
      dispatch(addToCartSuccess());
    } catch (err) {
      const error = ErrorHandler(err);
      dispatch(addToCartFail(error));
    }
};
