import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  FileOutlined,
  MoneyCollectFilled,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
import { clearAuth } from "../../../Store/actions/auth";
import { useDispatch } from "react-redux";

const CustomerSideMenu = (props) => {
  const { Item, SubMenu } = Menu;
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch(clearAuth());
  };

  return (
    <Menu mode="inline" defaultSelectedKeys={key} theme="dark">
      <Item key="1">
        <Link to="/account">Dashboard</Link>
      </Item>
      <Item icon={<UserOutlined />} key="3">
        <Link to="/account/wishlist">My Whislist</Link>
      </Item>
      <SubMenu key="sub3" icon={<FileOutlined />} title="Programs">
        <Item key="10">
          <Link to="/account/qrcodes/open">Pending Items</Link>
        </Item>
        <Item key="11">
          <Link to="/account/qrcodes/redeemed">Redeemed Items</Link>
        </Item>
      </SubMenu>
      <Item key="12" icon={<MoneyCollectFilled />}>
        <Link to="/account/transactions">Transaction History</Link>
      </Item>
      <Item key="13" icon={<NotificationOutlined />}>
        <Link to="/account/notifications">Notifications</Link>
      </Item>
      <Item key="14" icon={<SettingOutlined />}>
        <Link to="/account/settings">Settings</Link>
      </Item>
      <Item key="15" icon={<UserOutlined />}>
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      </Item>
    </Menu>
  );
};

export default CustomerSideMenu;
