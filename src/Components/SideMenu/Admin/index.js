import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  FileOutlined,
  MoneyCollectFilled,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";

const SideMenu = (props) => {
  const { Item, SubMenu } = Menu;
  const [key, setKey] = useState("");
  const location = useLocation();

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

  return (
    <Menu mode="inline" defaultSelectedKeys={key} theme="dark">
      <Item key="1">
        <Link to="/account">Dashboard</Link>
      </Item>
      <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
        <Item key="2">
          <Link to="/account/business">Business Accounts</Link>
        </Item>
        <Item key="3">
          <Link to="/account/affiliate">Affiliate Accounts</Link>
        </Item>
        <Item key="4">
          <Link to="/account/customer">Customer Accounts</Link>
        </Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<FileOutlined />} title="Products">
        <Item key="5">
          <Link to="/account/products">All Products</Link>
        </Item>
        {/* <Item key="6">
          <Link to="/account/sold">Sold Products</Link>
        </Item> */}
        {/* <Item key="7">
          <Link to="/account/in-stock">In Stocks</Link>
        </Item> */}
      </SubMenu>
      <SubMenu key="sub3" icon={<FileOutlined />} title="Programs">
        <Item key="8">
          <Link to="/account/programs">All Programs</Link>
        </Item>
        {/* <Item key="9">
          <Link to="/account/active">Active Programs</Link>
        </Item>
        <Item key="10">
          <Link to="/account/qrcodes/open">Pending</Link>
        </Item>
        <Item key="11">
          <Link to="/account/qrcodes/redeemed">Redeemed</Link>
        </Item> */}
      </SubMenu>
      <Item key="12" icon={<MoneyCollectFilled />}>
        <Link to="/account/transactions">Transaction History</Link>
      </Item>
      <Item key="13" icon={<NotificationOutlined />}>
        <Link to="/account/notifications">Notifications</Link>
      </Item>
    </Menu>
  );
};

export default SideMenu;
