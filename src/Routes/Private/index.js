import Dashboard from "../../Views/Private/Dashboard";
import OtherDashboard from "../../Views/Private/OtherDashboard";
import CustomerList from "../../Views/Private/Admin/CustomerAccounts";
import BusinessList from "../../Views/Private/Admin/BusinessAccounts";
import AffiliateList from "../../Views/Private/Admin/AffiliateAccount";
import ProductList from "../../Views/Private/Admin/Products";
import ProgramList from "../../Views/Private/Admin/Programs";
import CreateProduct from "../../Views/Private/Business/CreateProduct";
import ProductsList from "../../Views/Private/Business/ProductsList";
import CreateProgram from "../../Views/Private/Business/CreateProgram";
import VipProgram from "../../Views/Private/Business/VipProgram";
import TransactionHistory from "../../Views/Private/TransactionHistory";
import Settings from "../../Views/Private/Settings";
import UnredeemedCodes from "../../Views/Private/unredeemedCodes";
import RedeemedCodes from "../../Views/Private/redeemedCodes";
import Wishlist from "../../Views/Private/Customer/WishList";
import Notifications from "../../Views/Private/Notifications";
import Referrals from "../../Views/Private/Affiliate/Referrals";

const privateRoutes = [
  {
    path: "/",
    role: "admin",
    component: Dashboard,
    layout: "/private",
  },
  {
    path: "/",
    role: "notadmin",
    component: OtherDashboard,
    layout: "/private",
  },
  {
    path: "/transactions",
    role: "all",
    component: TransactionHistory,
    layout: "/private",
  },
  {
    path: "/programs",
    role: "business",
    component: VipProgram,
    layout: "/private",
  },
  {
    path: "/create-vip-program",
    role: "business",
    component: CreateProgram,
    layout: "/private",
  },
  {
    path: "/items",
    role: "business",
    component: ProductsList,
    layout: "/private",
  },
  {
    path: "/create-program",
    role: "business",
    component: CreateProduct,
    layout: "/private",
  },
  {
    path: "/customer",
    role: "admin",
    component: CustomerList,
    layout: "/private",
  },
  {
    path: "/business",
    role: "admin",
    component: BusinessList,
    layout: "/private",
  },
  {
    path: "/affiliate",
    role: "admin",
    component: AffiliateList,
    layout: "/private",
  },
  {
    path: "/products",
    role: "admin",
    component: ProductList,
    layout: "/private",
  },
  {
    path: "/programs",
    role: "admin",
    component: ProgramList,
    layout: "/private",
  },
  {
    path: "/settings",
    role: "all",
    component: Settings,
    layout: "/private",
  },
  {
    path: "/qrcodes/open",
    role: "all",
    component: UnredeemedCodes,
    layout: "/private",
  },
  {
    path: "/qrcodes/redeemed",
    role: "all",
    component: RedeemedCodes,
    layout: "/private",
  },
  {
    path: "/wishlist",
    role: "customer",
    component: Wishlist,
    layout: "/private",
  },
  {
    path: "/notifications",
    role: "all",
    component: Notifications,
    layout: "/private",
  },
  {
    path: "/referrals",
    role: "affiliate",
    component: Referrals,
    layout: "/private",
  },
];

export default privateRoutes;
