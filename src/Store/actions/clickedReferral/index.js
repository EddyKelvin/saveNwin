import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const clickedReferralStart = () => ({
  type: "CLICKED_REFERRAL_START",
});

export const clickedReferralSuccess = (payload) => ({
  type: "CLICKED_REFERRAL_SUCCESS",
  payload,
});

export const clickedReferralFail = (payload) => ({
  type: "CLICKED_REFERRAL_FAIL",
  payload,
});

export const clickedReferralCleanup = () => ({
  type: "CLICKED_REFERRAL_CLEANUP",
});

export const getClickedReferral = (payload) => async (dispatch) => {
  try {
    dispatch(clickedReferralStart());
    const requestObj = {
      path: `users/referrals`,
      method: "GET",
      data: payload,
    };
    const { referrals } = await AxiosCall(requestObj);
    dispatch(clickedReferralSuccess(referrals));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(clickedReferralFail(error));
  }
};
