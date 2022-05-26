import Home from "../../Views/Home";
import Login from "../../Views/Login";
import Signup from "../../Views/Signup";
import PasswordReset from "../../Views/PasswordReset";
import ForgotPassword from "../../Views/ForgotPass";
import Activate from "../../Views/Activate";
import ProductListing from "../../Views/ProductListing";
import Product from "../../Views/Product";
import ProgramDetails from "../../Views/ProgramDetails";
import ProgramListing from "../../Views/ProgramListing";
import ConfirmEmailChange from "../../Views/ConfirmEmailChange";

const publicRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    layout: "/public",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/public",
  },
  {
    path: "/signup",
    name: "Sign up",
    component: Signup,
    layout: "/public",
  },
  {
    path: "/password-reset/:token",
    name: "Password Reset",
    component: PasswordReset,
    layout: "/public",
  },
  {
    path: "/password-reset",
    name: "Forgot Password",
    component: ForgotPassword,
    layout: "/public",
  },
  {
    path: "/activate/:token",
    name: "Activate User Account",
    component: Activate,
    layout: "/public",
  },
  {
    path: "/products-list",
    name: "program listing",
    component: ProductListing,
    layout: "/public",
  },
  {
    path: "/products/:_id",
    name: "product Details",
    component: Product,
    layout: "/public",
  },
  {
    path: "/programs-list",
    name: "program listing",
    component: ProgramListing,
    layout: "/public",
  },
  {
    path: "/programs/:_id",
    name: "Program Details",
    component: ProgramDetails,
    layout: "/public",
  },
  {
    path: "/change-email/:token",
    name: "Confirm Email Change",
    component: ConfirmEmailChange,
    layout: "/public",
  },
];

export default publicRoutes