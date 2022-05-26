import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const usersStart = () => ({
  type: "USERS_START",
});

export const usersSuccess = (payload) => ({
  type: "USERS_SUCCESS",
  payload,
});

export const usersFail = (payload) => ({
  type: "USERS_FAIL",
  payload,
});

export const usersCleanup = () => ({
  type: "USERS_CLEANUP",
});

export const users = (payload) => async (dispatch) => {
  const { category, page, limit, state, role } = payload;
  try {
    dispatch(usersStart());
    const requestObj = {
      path: `users/search?page=${page}&limit=${limit}${
        category ? "&category=" + category : ""
      }${role ? "&role=" + role : ""}${state ? "&state=" + state : ""}`,
      method: "GET",
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(usersSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(usersFail(error));
  }
};
