import AxiosCall from "../../../Utils/axios";
import ErrorHandler from "../../../Utils/error-handler";

export const productProgramStart = () => ({
  type: "PRODUCT_PROGRAM_START",
});

export const productProgramSuccess = (payload) => ({
  type: "PRODUCT_PROGRAM_SUCCESS",
  payload,
});

export const productProgramFail = (payload) => ({
  type: "PRODUCT_PROGRAM_FAIL",
  payload,
});

export const productProgramCleanup = () => ({
  type: "PRODUCT_PROGRAM_CLEANUP",
});

export const productProgram = (payload) => async (dispatch) => {
  const { _id } = payload;
  try {
    dispatch(productProgramStart());
    const requestObj = {
      path: `products/programs/${_id}`,
      method: "GET",
    };

    const { data } = await AxiosCall(requestObj);
    dispatch(productProgramSuccess(data));
  } catch (err) {
    const error = ErrorHandler(err);
    dispatch(productProgramFail(error));
  }
};
