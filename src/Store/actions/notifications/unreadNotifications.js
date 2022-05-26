import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const unreadNotificationsStart = () => ({
  type: "UNREAD_NOTIFICATIONS_START",
});

export const unreadNotificationsSuccess = (payload) => ({
  type: "UNREAD_NOTIFICATIONS_SUCCESS",
  payload,
});

export const unreadNotificationsFail = (payload) => ({
  type: "UNREAD_NOTIFICATIONS_FAIL",
  payload,
});

export const unreadNotificationsCleanup = () => ({
  type: "UNREAD_NOTIFICATIONS_CLEANUP",
});

export const unreadNotifications = (payload) => async (dispatch) => {
  try {
    dispatch(unreadNotificationsStart());
    const requestObj = {
      path: `users/notifications/unread?limit=10${
        payload ? "&page=" + payload : ""
      }`,
      method: "GET",
    };

    const { data } = await AxiosCall(requestObj);
    dispatch(unreadNotificationsSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(unreadNotificationsFail(error));
  }
};
