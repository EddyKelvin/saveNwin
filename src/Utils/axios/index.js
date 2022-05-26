import Axios from "axios";

const REACT_APP_SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

let baseURL;
if (REACT_APP_SERVER_HOST) {
  baseURL = `${REACT_APP_SERVER_HOST}/api/`;
} else {
  const host = "https://staging-save-n-win.herokuapp.com";
  baseURL = `${host}/api/`;
}

const AxiosCall = async (requestObj) => {
  const { path, method, data, contentType, version = "v1" } = requestObj;

  const token = localStorage.getItem("authToken");

  const headers = {
    Authorization: `Bearer ` + token,
    "Content-Type": contentType || "application/json",
  };

  const url = version ? `${baseURL}${version}/${path}` : `${baseURL}${path}`;
  try {
    const response = await Axios({ method, url, data, headers, json: true });
    const result = response && response.data;

    return result;
  } catch (error) {
    if (error.response.data.status === 401) {
      localStorage.setItem("authToken", "");
      window.location.href = "/login";
    }
    throw error;
  }
};

export default AxiosCall;
