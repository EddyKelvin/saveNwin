import { combineReducers } from "redux";

//reducers
import login from "./login";
import signup from "./signup";
import signupProgress from "./signupProgress";
import auth from "./auth";
import passReset from "./passwordReset";
import forgotPass from "./forgotPassword";
import activate from "./activate";
import sub from "./subscription";
import productList from "./productList";
import product from "./products";
import users from "./users";
import programs from "./programs";
import createProduct from "./business/createProduct";
import getProduct from "./business/getProduct";
import createProgram from "./business/createProgram";
import getProgram from "./business/getProgram";
import programDetails from "./programDetails";
import userPayment from "./userPayment";
import scanCode from "./scanCode";
import redeemCode from "./redeemCode";
import getTransaction from "./business/getTransaction";
import changeEmail from "./business/changeEmail";
import confirmEmail from "./comfirmEmail";
import updateProfile from "./updateProfile";
import getMe from "./getMe";
import unredeemedCodes from "./unredeemedCodes";
import redeemedCodes from "./redeemedCodes";
import changePass from "./changePassword";
import addToCart from "./addToCart";
import addManyToCart from "./addManyToCart";
import getCart from "./getCart";
import productProgram from "./productProgram";
import deleteAccount from "./deleteAccount";
import addFlag from "./flagging/addFlag";
import deleteFlag from "./flagging/deleteFlag";
import AllNotifications from "./notifications/allNotifications";
import clickedReferral from "./clickedReferral";
import UnreadNotifications from "./notifications/unreadNotifications";
import SingleNotifications from "./notifications/singleNotifications";

const rootReducer = combineReducers({
  login,
  signup,
  signupProgress,
  auth,
  passReset,
  forgotPass,
  activate,
  sub,
  productList,
  product,
  users,
  programs,
  createProduct,
  getProduct,
  createProgram,
  getProgram,
  programDetails,
  userPayment,
  redeemCode,
  scanCode,
  getTransaction,
  changeEmail,
  confirmEmail,
  updateProfile,
  getMe,
  unredeemedCodes,
  redeemedCodes,
  changePass,
  addToCart,
  addManyToCart,
  getCart,
  productProgram,
  deleteAccount,
  addFlag,
  deleteFlag,
  AllNotifications,
  clickedReferral,
  UnreadNotifications,
  SingleNotifications,
});

export default rootReducer;
