import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../../../../Components/CustomerUsersList";
import { ModalWrapper, Modal, NotificationTab } from "./styles";
import Paginate from "../../../../Components/Paginate";
import Loader from "../../../../Components/Loader/Index";
import { users, usersCleanup } from "../../../../Store/actions/users";
import AxiosCall from "../../../../Utils/axios";
import { toast } from "react-toast";
import Moment from "moment";
import { Popover, message } from "antd";

const Notifications = () => {
  const key = "updatable";
  const userListState = useSelector((s) => s.users);
  const [userList, setUserList] = useState(null);
  const [isSending, setIsSending] = useState(0);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userProfileModal, setUserProfileModal] = useState(false);
  const dispatch = useDispatch();
  const userProfileRef = useRef(null);
  const [notificationType, setNotificationType] = useState("all");
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    dispatch(users({ role: "customer" }));
  }, []);

  useEffect(() => {
    if (userListState.isSuccessful) {
      setUserList(userListState.data);
      dispatch(usersCleanup());
    } else if (userListState.error) {
      setError(userListState.error);
      dispatch(usersCleanup());
    }
  }, [userListState]);

  const closeModal = (e) => {
    if (e.target == userProfileRef.current) {
      setUserData(null);
      setUserProfileModal(false);
    }
  };

  const actions = {
    showUserDetails: (_id) => {},
    moreOptions: [
      {
        title: "View",
        onClick: async (_id) => {
          try {
            setIsSending(_id);
            setUserProfileModal(true);
            const result = await AxiosCall({
              method: "GET",
              path: "admin/users/" + _id,
            });

            setUserData(result.data);

            setIsSending(0);
            toast("successful");
          } catch (error) {
            toast("something went wrong");
          }
        },
      },

      {
        title: "suspend 2 weeks",
        onClick: async (_id) => {
          try {
            setIsSending(_id);
            const result = await AxiosCall({
              method: "POST",
              path: "admin/users/suspend/" + _id,
              data: {
                month: 0,
                week: 2,
              },
            });
            setIsSending(0);

            if (result.status == 200) {
              message.success({ content: "User suspended", key, duration: 2 });
            } else {
              message.error({ content: "An error occurred", key, duration: 2 });
            }
          } catch (error) {
            toast("something went wrong");
          }
        },
      },
      {
        title: "suspend 1 month",
        onClick: async (_id) => {
          try {
            setIsSending(_id);
            const result = await AxiosCall({
              method: "POST",
              path: "admin/users/suspend/" + _id,
              data: {
                month: 1,
                week: 0,
              },
            });
            setIsSending(0);

            if (result.status == 200) {
              message.success({ content: "User suspended", key, duration: 2 });
            } else {
              message.error({ content: "An error occurred", key, duration: 2 });
            }
          } catch (error) {
            toast("something went wrong");
          }
        },
      },
      {
        title: "unsuspend",
        onClick: async (_id) => {
          try {
            setIsSending(_id);
            const result = await AxiosCall({
              method: "POST",
              path: "admin/users/suspend/" + _id,
            });
            setIsSending(0);

            if (result.status == 200) {
              message.success({
                content: "Suspension lifted",
                key,
                duration: 2,
              });
            } else {
              message.error({ content: "An error occurred", key, duration: 2 });
            }
          } catch (error) {
            toast("something went wrong");
          }
        },
      },
      {
        title: "delete",
        onClick: async (_id) => {
          try {
            const result = await AxiosCall({
              method: "DELETE",
              path: "users/" + _id,
            });
            dispatch(users({ role: "business" }));
            toast("successful");
          } catch (error) {
            toast(error);
          }
        },
      },
    ],
  };

  const navigate = (data) => {
    dispatch(
      users({
        ...data,
        role: "customer",
      })
    );
  };

  useEffect(async () => {
    const result = await AxiosCall({
      method: "GET",
      path: "users/notifications/unread",
    });
    setNotifications(result.data);
    setUnreadNotifications(result.data.filter((item) => item.read == false));
    setAllNotifications(result.data);
  }, []);

  return (
    <div className="customer-list container">
      <h3>Notifications</h3>

      <NotificationTab>
        <li
          className={notificationType == "all" ? "active" : ""}
          onClick={() => {
            setNotificationType("all");
            setNotifications(allNotifications);
          }}
        >
          All notifications
        </li>
        <li
          className={notificationType == "unread" ? "active" : ""}
          onClick={() => {
            setNotificationType("unread");
            setNotifications(unreadNotifications);
          }}
        >
          Unread notifications
        </li>
      </NotificationTab>
      <div className="table-wrapper">
        <div className="table">
          <li className="table-head" id="top-level">
            <span className="user-id" style={{ width: "20%" }}>
              No.
            </span>
            <span className="user-email">Type</span>
            <span className="user-type">Title</span>
            <span className="actions">Date</span>
          </li>
          {error && <li>{error}</li>}
          <ul className="table-body">
            {notifications &&
              notifications.map((data, key) => (
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setUserProfileModal(true);
                    setUserData(data);
                  }}
                  className="all-users"
                  key={key}
                >
                  <span className="items user-id" style={{ width: "20%" }}>
                    {key + 1}
                  </span>
                  <span className="items">
                    {data.type == "program_delete"
                      ? "Program deleted"
                      : data.type == "program_flag"
                      ? "program flaged"
                      : data.type == "program_new"
                      ? "New program"
                      : ""}
                  </span>
                  <span className="items user-email">{data.title}</span>
                  <span className="items user-type" style={{ width: "20%" }}>
                    {Moment(data.createdAt).format("Do MM  YYYY, h:mm a")}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      {userProfileModal && (
        <ModalWrapper ref={userProfileRef} onClick={closeModal}>
          <Modal>
            {!userData ? (
              <Loader />
            ) : (
              <>
                <div className="profile-overview">
                  <div className="user-info">
                    <span>{userData?.title}</span>
                    <span>Summary of the program</span>
                  </div>
                </div>

                <ul>
                  <li>
                    <span>Program name: </span>{" "}
                    <span>{userData.resource.program?.title}</span>
                  </li>
                  <li>
                    <span>Total Selling Price: </span>{" "}
                    <span>{userData.resource.program?.businessType}</span>
                  </li>
                  <li>
                    <span>Total discount: </span>{" "}
                    <span>${userData.resource.program?.totalDiscount}</span>
                  </li>
                  <li>
                    <span>Final price: </span>{" "}
                    <span>${userData.resource.program?.totalPrice}</span>
                  </li>
                  <li>
                    <span>Address: </span>{" "}
                    <span>{userData.resource.program?.address}</span>
                  </li>
                  <li>
                    <span>City: </span>{" "}
                    <span>{userData.resource.program?.city}</span>
                  </li>
                  <li>
                    <span>State: </span>{" "}
                    <span>{userData.resource.program?.state}</span>
                  </li>
                  <li>
                    <span>Date: </span>{" "}
                    <span>
                      {Moment(userData.resource.program.createdAt).format(
                        "Do MM  YYYY, h:mm a"
                      )}
                    </span>
                  </li>
                </ul>
              </>
            )}
          </Modal>
        </ModalWrapper>
      )}
    </div>
  );
};

export default Notifications;
