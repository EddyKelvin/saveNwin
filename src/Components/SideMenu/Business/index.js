import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  FileOutlined,
  HomeOutlined,
  MoneyCollectFilled,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
import { clearAuth } from "../../../Store/actions/auth";
import { useDispatch } from "react-redux";

const BusinessSideMenu = (props) => {
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

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch(clearAuth());
  };

  useEffect(() => {
    getkey();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Menu mode="inline" defaultSelectedKeys={key} theme="dark">
      <Item key="0" icon={<HomeOutlined />}>
        <Link to="/account">Dashboard</Link>
      </Item>
      <SubMenu key="sub1" icon={<FileOutlined />} title="Products">
        <Item key="1">
          <Link to="/account/create-program">Create Item</Link>
        </Item>

        <Item key="2">
          <Link to="/account/items">Items List</Link>
        </Item>

        <Item key="3">
          <Link to="/account/create-vip-program">Create VIP Program</Link>
        </Item>

        <Item key="4">
          <Link to="/account/programs">Program List</Link>
        </Item>
      </SubMenu>
      <Item key="5" icon={<UserOutlined />}>
        <Link to="/account/qrcodes/redeemed">Redeemed Codes</Link>
      </Item>
      <Item key="8" icon={<UserOutlined />}>
        <Link to="/account/qrcodes/open">Unredeemed Codes</Link>
      </Item>
      <Item key="9" icon={<MoneyCollectFilled />}>
        <Link to="/account/transactions">Transactions</Link>
      </Item>
      <Item key="10" icon={<UserOutlined />}>
        <Link to="/account/notifications">Notifications</Link>
      </Item>
      <Item key="11" icon={<SettingOutlined />}>
        <Link to="/account/settings">Settings</Link>
      </Item>
      <Item key="12" icon={<UserOutlined />}>
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      </Item>
    </Menu>
  );
};

export default BusinessSideMenu;
