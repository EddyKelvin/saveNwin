/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  MoneyCollectFilled,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
import { clearAuth } from "../../../Store/actions/auth";
import { useDispatch } from "react-redux";

const CustomerSideMenu = (props) => {
  const { Item } = Menu;
  const [key, setKey] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  const getkey = () => {
    const routes = [
      "business",
      "affiliate",
      "customer",
      "products",
      "sold",
      "in-stock",
      "programs",
      "active",
      "pending",
      "redeemed",
      "transactions",
    ];

    routes.map((route, key) => {
      const { pathname } = location;

      const match = pathname.split("/");
      if (route === match[match.length + 1]) {
        setKey([(key + 1).toString()]);
        return;
      } else return ["1"];
    });
  };

  useEffect(() => {
    getkey();
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch(clearAuth());
  };

  return (
    <Menu mode="inline" defaultSelectedKeys={key} theme="dark">
      <Item key="1">
        <Link to="/account">Dashboard</Link>
      </Item>
      <Item key="12" icon={<MoneyCollectFilled />}>
        <Link to="/account/referrals">Referrals</Link>
      </Item>
      <Item key="14" icon={<NotificationOutlined />}>
        <Link to="/account/notifications">Notifications</Link>
      </Item>
      <Item key="15" icon={<SettingOutlined />}>
        <Link to="/account/settings">Settings</Link>
      </Item>
      <Item key="16" icon={<UserOutlined />}>
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      </Item>
    </Menu>
  );
};

export default CustomerSideMenu;
