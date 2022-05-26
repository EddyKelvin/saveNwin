const token = localStorage.getItem("tokenUser");
const user = localStorage.getItem("authUser");

export const login = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const users = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const createProduct = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const createProgram = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const programs = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const signup = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const subscription = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const productList = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const businessProductList = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const businessProgramList = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const product = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const activate = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const passReset = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};
export const createItem = {
  isCreating: false,
  isSuccessful: false,
  data: null,
  error: null,
};
export const forgotPass = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const signupProgress = {
  role: "business",
  email: null,
  password: null,
  phoneNo: null,
  stage: "account",
};

export const auth = {
  token: token || null,
  user: user || null,
  isLoggedIn: token ? true : false,
};

export const programDetails = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const userPayment = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const scanCode = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const businessTransaction = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const redeemCode = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const updateProfile = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const changeEmail = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const getMe = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const confirmEmail = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const unredeemedCodes = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const addToCart = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const redeemedCodes = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const addManyToCart = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const changePassword = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const getCart = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const getProductProgram = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const deleteAccount = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const addFlag = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const deleteFlag = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const allNotifications = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const unreadNotifications = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const singleNotifications = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};

export const clickedReferral = {
  isLoading: false,
  isSuccessful: false,
  data: null,
  error: null,
};
