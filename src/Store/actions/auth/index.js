export const setAuth = () => {
  const token = localStorage.getItem("authToken");

  if (token) {
    return {
      type: "SET_AUTH",
      payload: {
        token,
        isLoggedIn: true,
      },
    };
  }
  return {
    type: "CLEAR_AUTH",
  };
};

export const clearAuth = () => ({
  type: "CLEAR_AUTH",
});
