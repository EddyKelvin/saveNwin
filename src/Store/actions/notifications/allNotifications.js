import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const allNotificationsStart = () => ({
  type: "ALL_NOTIFICATIONS_START",
});

export const allNotificationsSuccess = (payload) => ({
  type: "ALL_NOTIFICATIONS_SUCCESS",
  payload,
});

export const allNotificationsFail = (payload) => ({
  type: "ALL_NOTIFICATIONS_FAIL",
  payload,
});

export const allNotificationsCleanup = () => ({
  type: "ALL_NOTIFICATIONS_CLEANUP",
});

export const allNotifications = (payload) => async (dispatch) => {
  try {
    dispatch(allNotificationsStart());
    const requestObj = {
      path: `users/notifications?${payload ? "page=" + payload : ""}`,
      method: "GET",
    };

    const { data } = await AxiosCall(requestObj);
    dispatch(allNotificationsSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(allNotificationsFail(error));
  }
};
