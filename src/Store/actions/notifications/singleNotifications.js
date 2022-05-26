import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const singleNotificationsStart = () => ({
  type: "SINGLE_NOTIFICATIONS_START",
});

export const singleNotificationsSuccess = (payload) => ({
  type: "SINGLE_NOTIFICATIONS_SUCCESS",
  payload,
});

export const singleNotificationsFail = (payload) => ({
  type: "SINGLE_NOTIFICATIONS_FAIL",
  payload,
});

export const singleNotificationsCleanup = () => ({
  type: "SINGLE_NOTIFICATIONS_CLEANUP",
});

export const singleNotifications = (payload) => async (dispatch) => {
  const { _id } = payload;

  try {
    dispatch(singleNotificationsStart());
    const requestObj = {
      path: `users/notifications/${_id}`,
      method: "GET",
    };

    const { data } = await AxiosCall(requestObj);
    dispatch(singleNotificationsSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(singleNotificationsFail(error));
  }
};
