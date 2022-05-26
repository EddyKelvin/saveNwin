//styles
import "./index.css";

//modules & packages
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Route, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//media and pictures
import logo from "../../Assets/images/logo.png";

//Routes
import privateRoutes from "../../Routes/Private";

//side menus
import AdminSideMenu from "../../Components/SideMenu/Admin";
import BusinessSideMenu from "../../Components/SideMenu/Business";
import AffiliateSideMenu from "../../Components/SideMenu/Affiliate";
import CustomerSideMenu from "../../Components/SideMenu/Customer";

//components
import PrivateTop from "../../Components/PrivateTop";

//Actions
import { getMe, getMeCleanup } from "../../Store/actions/getMe";

const ProtectedLayout = (props) => {
  const { Content, Sider } = Layout;
  const history = useHistory();
  const dispatch = useDispatch();
  const authState = useSelector((s) => s.auth);
  const [user, setUser] = useState(null);
  const getMeState = useSelector((s) => s.getMe);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      dispatch(getMe());
    } else {
      history.push("/login");
    }
  }, [authState]);

  useEffect(() => {
    if (getMeState.isSuccessful) {
      setUser(getMeState.data.user);
      dispatch(getMeCleanup());
    } else if (getMeState.error) {
      history.push("/login");
      dispatch(getMeCleanup());
    }
  });

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }

      if (
        prop.layout === "/private" &&
        (prop.role === user.role ||
          prop.role === "all" ||
          (prop.role === "notadmin" && user.role !== "admin"))
      ) {
        return (
          <Route
            exact={prop.path === "/"}
            path={props.match.url + prop.path}
            key={key}
            component={prop.component}
          />
        );
      }
    });
  };

  return authState.isLoggedIn ? (
    <Layout className="protected-layout">
      <Sider>
        {user && (
          <>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            {user.role === "admin" && <AdminSideMenu />}
            {user.role === "customer" && <CustomerSideMenu />}
            {user.role === "affiliate" && <AffiliateSideMenu />}
            {user.role === "business" && <BusinessSideMenu />}
          </>
        )}
      </Sider>

      <Layout>
        <Content className="protected-content">
          <PrivateTop />
          {user && getRoutes(privateRoutes)}
        </Content>
      </Layout>
    </Layout>
  ) : null;
};

export default ProtectedLayout;
