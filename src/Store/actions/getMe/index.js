import AxiosCall from '../../../Utils/axios';
import ErrorHandler from '../../../Utils/error-handler';


export const getMeStart = () => ({
  type: "GET_ME_START",
});

export const getMeSuccess = payload => ({
  type: "GET_ME_SUCCESS",
  payload,
});

export const getMeFail = payload => ({
  type: "GET_ME_FAIL",
  payload,
});

export const getMeCleanup = () => ({
  type: "GET_ME_CLEANUP",
});

export const getMe = payload => async dispatch => {
  try {
    dispatch(getMeStart());
    const requestObj = {
      path: 'users/me',
      method: 'GET',
    };
    const { data } = await AxiosCall(requestObj);
    dispatch(getMeSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(getMeFail(error));
  }
};
