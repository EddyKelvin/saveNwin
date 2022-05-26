const ErrorHandler = (e) => {
  let errorResponse;
  try {
    if (e.response.data === undefined) errorResponse = "Something went wrong";
    const { message } = e.response.data;
    errorResponse = message;
  } catch (e) {
    errorResponse = "Something went wrong";
  }

  return errorResponse;
};

export default ErrorHandler;
