//styles
import "./index.css";

//modules and packages
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Popover } from "antd";

//medias
import logo from "../../Assets/images/logo.png";

//actions
import { clearAuth } from "../../Store/actions/auth";
import { getMe, getMeCleanup } from "../../Store/actions/getMe";

const NavBar = () => {
  const authState = useSelector((state) => state.auth);
  const getMeState = useSelector((state) => state.getMe);
  const dispatch = useDispatch();
  const home = useRouteMatch("/");
  const [mobileNav, setMobileNav] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [isHome, setIsHome] = useState(false);
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch(clearAuth());
    dispatch(getMe());
  };

  const Content = () => (
    <ul className="popover-content">
      <li>
        <Link className="text-dark" to="/account/">
          Dashboard
        </Link>
      </li>
      <li>
        <Link className="text-dark" to="/account/notifications">
          Notifications
        </Link>
      </li>
    </ul>
  );

  useEffect(() => {
    if (authState.isLoggedIn) {
      dispatch(getMe());
    }
  }, [authState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (getMeState.isSuccessful) {
      setUser(getMeState.data.user);
      dispatch(getMeCleanup());
    } else if (getMeState.error) {
      setUser(null);
      dispatch(clearAuth());
      dispatch(getMeCleanup());
    }
  }, [getMeState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setIsHome(home.isExact);
    window.addEventListener("scroll", (e) => {
      if (window.pageYOffset >= window.innerHeight * 0.6) {
        setAtTop(false);
      } else {
        setAtTop(true);
      }
    });
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [home]);

  return (
    <div className={`public-nav ${isHome && atTop ? "home-nav" : ""}`}>
      <Container>
        <Link className="logo" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="mobile-toggler">
          {!mobileNav && (
            <MenuUnfoldOutlined
              onClick={() => setMobileNav(true)}
              className="toggle-btn"
            />
          )}
          {mobileNav && (
            <CloseOutlined
              onClick={() => setMobileNav(false)}
              className="toggle-btn"
            />
          )}
        </div>
        <nav className={`${mobileNav ? "show-nav" : ""}`}>
          <ul id="ul">
            <li className="nav-items">
              <Link to="/" className="nav-links">
                Home
              </Link>
            </li>

            {!user && (
              <li className="nav-items">
                <Link to="/login" className="nav-links">
                  Login
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-items">
                <Link href="nav-links" to="/" id="logout-btn" onClick={logout}>
                  Logout
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-items user-btn">
                <Popover content={Content} trigger="click" placement="bottom">
                  <div className="user-avatar">
                    <button className="btn btn-outline-light">Account</button>
                  </div>
                </Popover>
              </li>
            )}
            {!user && (
              <li className="nav-items special">
                <Link className="nav-links" to="/signup">
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default NavBar;
