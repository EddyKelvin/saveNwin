/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-line react-hooks/exhaustive-deps
//styles
import "./index.css";

//packages and modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeCleanup } from "../../Store/actions/getMe";
import { UserOutlined } from "@ant-design/icons";
import AxiosCall from "../../Utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { LeftRow, NotifyWrapper } from "./styles";

const PrivateTop = () => {
  const getMeState = useSelector((state) => state.getMe);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationModal, setNotificationModal] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (getMeState.isSuccessful) {
      setUser(getMeState.data.user);
      dispatch(getMeCleanup());
    }
  }, [getMeState]);

  useEffect(() => {
    if (typeof window != "undefined") {
      const sitWrapper = document.querySelector(".protected-layout");
      const toggleMenu = document.querySelector(".private-top .toggle-menu");
      const slideMenu = document.querySelector(
        ".protected-layout .ant-layout-sider"
      );

      if (!document.querySelector(".menu-overlay")) {
        const overLay = document.createElement("span");
        sitWrapper.appendChild(overLay);
        overLay.classList.add("menu-overlay");
        overLay.style.display = "none";
        overLay.style.backgroundColor = "#0006";
        overLay.style.width = "100%";
        overLay.style.height = "100vh";
        overLay.style.zIndex = "999999";
        overLay.style.cursor = "pointer";
        overLay.style.position = "fixed";
        overLay.style.top = "0px";
        overLay.style.left = "0px";
        overLay.addEventListener("click", (e) => {
          slideMenu.style.display = "none";
          overLay.style.display = "none";
        });
      }

      toggleMenu.addEventListener("click", (e) => {
        const overLay = document.querySelector(
          ".protected-layout .menu-overlay"
        );
        overLay.style.display = "block";
        slideMenu.style.display = "block";
      });
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const notifs = async () => {
    const { data } = await AxiosCall({
      method: "GET",
      path: "users/notifications/unread",
    });

    setNotifications(data);
  };

  useEffect(() => {
    notifs();
  }, []);

  return (
    <div className="private-top">
      <div className="toggle-menu">
        <span></span>
      </div>

      <LeftRow>
        <NotifyWrapper>
          <FontAwesomeIcon
            style={{
              fontSize: "25px",
            }}
            cursor="pointer"
            icon={faBell}
            color="#111111"
            onClick={() => setNotificationModal(!showNotificationModal)}
          />
          {notifications.length > 0 && <span>{notifications.length}</span>}
          {showNotificationModal && (
            <ul className="motes">
              {notifications.map((data, key) => (
                <li key={key} onClick={() => setNotificationModal(false)}>
                  {data.title}
                </li>
              ))}
            </ul>
          )}
        </NotifyWrapper>
        <div className="user-avatar">
          {user.avatar && user.avatar.secure_url ? (
            <img src={user.avatar ? user.avatar.secure_url : ""} alt="avatar" />
          ) : (
            <UserOutlined style={{ fontSize: "22px" }} />
          )}
        </div>
      </LeftRow>
    </div>
  );
};

export default PrivateTop;
