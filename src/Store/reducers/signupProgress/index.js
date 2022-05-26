import { signupProgress as initialState } from "../../initialStates";

const signupProgress = (state = initialState, { payload, type }) => {
  switch (type) {
    case "SET_ROLE":
      return {
        ...state,
        role: payload.role,
        stage: "profile",
      };
    case "SET_PROFILE":
      return {
        ...state,
        email: payload.email,
        phoneNo: payload.phoneNo,
        minority: payload.minority,
        stage: "password",
      };
    case "SET_STAGE":
      return {
        ...state,
        stage: payload.stage,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: payload.password,
        stage: payload.stage,
      };
    case "CLEANUP":
      return {
        ...state,
        role: "business",
        email: null,
        phoneNo: null,
        password: null,
        minority: null,
        stage: "account",
      };
    default:
      return state;
  }
};

export default signupProgress;
