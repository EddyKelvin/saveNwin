//styles
import "./index.css";

//modules & packages
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

//components
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import PublicRoutes from "../../Routes/Public";

const PublicLayout = () => {
  const [noNav, setNoNav] = useState(false);
  const loginMatch = useRouteMatch("/login");
  const signupMatch = useRouteMatch("/signup");
  const passMatch = useRouteMatch("/password-reset");
  const { Content } = Layout;

  useEffect(() => {
    if (loginMatch) {
      if (loginMatch.isExact) {
        return setNoNav(loginMatch.isExact);
      } else {
        setNoNav(false);
      }
    } else {
      if (signupMatch) {
        if (signupMatch.isExact) {
          return setNoNav(signupMatch.isExact);
        } else {
          return setNoNav(false);
        }
      } else if (passMatch) {
        if (passMatch.isExact) {
          return setNoNav(passMatch.isExact);
        } else {
          return setNoNav(false);
        }
      } else {
        return setNoNav(false);
      }
    }
    return;
  }, [loginMatch, signupMatch, passMatch]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/public") {
        return (
          <Route exact={prop.path === "/"} path={prop.path} key={key}>
            <prop.component />
          </Route>
        );
      } else if (prop.path !== "/public") {
        return <Redirect to="/" />;
      }
    });
  };
  return (
    <Layout className={`public-layout ${noNav ? "no-nav" : ""}`}>
      {!noNav && <NavBar />}
      <Content>
        <Switch>{getRoutes(PublicRoutes)}</Switch>
      </Content>
      {!noNav && <Footer />}
    </Layout>
  );
};

export default PublicLayout;
