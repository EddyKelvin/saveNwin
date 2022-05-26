/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./index.css";
import { Tabs, Modal, Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  allNotifications,
  allNotificationsCleanup,
} from "../../../Store/actions/notifications/allNotifications";
import {
  unreadNotifications,
  unreadNotificationsCleanup,
} from "../../../Store/actions/notifications/unreadNotifications";
import {
  singleNotifications,
  singleNotificationsCleanup,
} from "../../../Store/actions/notifications/singleNotifications";
import AccountCreationTemplate from "../../../Components/UserNotificationTemplates/accountCreationTemplate";
import NewProgramTemplate from "../../../Components/UserNotificationTemplates/newProgramTemplate";
import ProgramDeleteTemplate from "../../../Components/UserNotificationTemplates/programDeleteTemplate";
import FlagProgramTemplate from "../../../Components/UserNotificationTemplates/flagProgramNotification";
import TransactionTemplate from "../../../Components/UserNotificationTemplates/transactionTemplate";

const Notifications = () => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const allNotificationsState = useSelector((state) => state.AllNotifications);
  const unreadNotificationsState = useSelector(
    (state) => state.UnreadNotifications
  );
  const singleNotificationsState = useSelector(
    (state) => state.SingleNotifications
  );

  const [allNotification, setAllNotification] = useState([]);
  const [unreadNotification, setUnreadNotification] = useState([]);
  const [singleNotification, setSingleNotification] = useState([]);
  const [notificationPage, setNotificationPage] = useState("");
  const [unreadNotificationPage, setUnreadNotificationPage] = useState("");

  const handleSubmit = (id) => {
    dispatch(singleNotifications({ _id: id }));
  };

  useEffect(() => {
    dispatch(allNotifications());
    dispatch(unreadNotifications());
  }, []);

  useEffect(() => {
    if (allNotificationsState.isSuccessful) {
      setAllNotification(allNotificationsState.data.notifications);
      setNotificationPage(allNotificationsState.data);
      dispatch(allNotificationsCleanup());
    } else if (allNotificationsState.error) {
      dispatch(allNotificationsCleanup());
    }
  }, [allNotificationsState]);

  useEffect(() => {
    if (unreadNotificationsState.isSuccessful) {
      setUnreadNotification(unreadNotificationsState.data);
      setUnreadNotificationPage(unreadNotificationsState);
      dispatch(unreadNotificationsCleanup());
    } else if (unreadNotificationsState.error) {
      dispatch(unreadNotificationsCleanup());
    }
  }, [unreadNotificationsState]);

  useEffect(() => {
    if (singleNotificationsState.isSuccessful) {
      setSingleNotification(singleNotificationsState.data);
      dispatch(unreadNotifications());
      dispatch(allNotifications());
      showModal();
      dispatch(singleNotificationsCleanup());
    } else if (singleNotificationsState.error) {
      setSingleNotification(null);
      dispatch(singleNotificationsCleanup());
    }
  }, [singleNotificationsState]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changePage = (page) => {
    dispatch(allNotifications(page));
  };
  const changePageUnread = (page) => {
    dispatch(unreadNotifications(page));
  };

  return (
    <div className="notification-container">
      <h1>Notifications</h1>
      <hr />
      <Tabs defaultActiveKey="1">
        <TabPane tab="All notifications" key="1">
          {allNotificationsState.isLoading ? (
            <div className="text-center py-5">
              <LoadingOutlined style={{ fontSize: 30 }} spin />
            </div>
          ) : (
            <>
              {allNotification.length <= 0 ? (
                <div className="text-center py-5">
                  <p className="fw-bold fs-6">No notifications</p>
                </div>
              ) : (
                <>
                  <div className="table-responsive mb-5">
                    <table className="table borderless">
                      <thead>
                        <tr>
                          <th scope="col">No.</th>
                          <th scope="col">Type</th>
                          <th scope="col">Title</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>

                      <tbody>
                        {allNotification.map((item, index) => (
                          <tr
                            key={index}
                            onClick={() => handleSubmit(item._id)}
                          >
                            <th scope="row" style={{ position: "relative" }}>
                              {index + 1}

                              {item.read ? null : (
                                <span
                                  style={{ position: "absolute", top: "10px" }}
                                >
                                  <FontAwesomeIcon
                                    size="xs"
                                    color="#1890ff"
                                    icon={faCircle}
                                  />
                                </span>
                              )}
                            </th>
                            <td>{typeNaming(item)} </td>
                            <td>{item.title}</td>
                            <td>
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-end pb-5 pt-4">
                    <Pagination
                      onChange={changePage}
                      total={notificationPage.totalNotifications}
                      hideOnSinglePage={true}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </TabPane>

        <TabPane tab="Unread notifications" key="2">
          {unreadNotification.length <= 0 ? (
            <div className="text-center py-5">
              <p className="fw-bold fs-6">No unread notifications</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table class="table borderless">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Type</th>
                      <th scope="col">Title</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {unreadNotification.map((item, index) => (
                      <tr onClick={() => handleSubmit(item._id)}>
                        <th scope="row">{index + 1}</th>
                        <td>{typeNaming(item)} </td>
                        <td>{item.title}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end pb-5 pt-4">
                <Pagination
                  onChange={changePageUnread}
                  total={unreadNotificationPage.totalNotifications}
                  hideOnSinglePage={true}
                />
              </div>
            </>
          )}
        </TabPane>
      </Tabs>

      <Modal
        title={singleNotification.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {(() => {
          if (singleNotification.type === "new_program") {
            return <NewProgramTemplate data={singleNotification} />;
          }
          if (singleNotification.type === "program_delete") {
            return <ProgramDeleteTemplate data={singleNotification} />;
          }
          if (singleNotification.type === "program_flag") {
            return <FlagProgramTemplate data={singleNotification} />;
          }
          if (singleNotification.type === "successful_transaction") {
            return <TransactionTemplate data={singleNotification} />;
          }

          if (singleNotification.type === "account_creation") {
            return <AccountCreationTemplate data={singleNotification} />;
          }
        })()}
      </Modal>
    </div>
  );
};

const typeNaming = (value) => {
  if (value.type === "new_program") {
    return "New program";
  } else if (value.type === "program_delete") {
    return "Program deleted";
  } else if (value.type === "successful_transaction") {
    return "Successful transaction";
  } else if (value.type === "program_flag") {
    return "Flagged program";
  } else if (value.type === "verification") {
    return "Verification";
  } else if (value.type === "account_creation") {
    return "Account creation";
  }
};

export default Notifications;
