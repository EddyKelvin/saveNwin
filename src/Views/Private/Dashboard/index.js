/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
//styles
import "./index.css";

import React, { useEffect, useState, useRef } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Paginate from "../../../Components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { users, usersCleanup } from "../../../Store/actions/users";
import AxiosCall from "../../../Utils/axios";
import { toast } from "react-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { ModalWrapper, Modal } from "./styles";
import Loader from "../../../Components/Loader/Index";
import { message, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const key = "updatable";
  const usersListState = useSelector((s) => s.users);
  const siteStats = useSelector((state) => state.getMe);
  const dispatch = useDispatch();
  const [usersList, setUsersList] = useState(null);
  const [navigationData, setNavigationData] = useState(null);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(0);
  const [userProfileModal, setUserProfileModal] = useState(false);
  const userProfileRef = useRef(null);
  const [visibility, setVisibility] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    dispatch(users({}));
  }, []);

  useEffect(() => {
    if (usersListState.isSuccessful) {
      setUsersList(usersListState.data.users);
      setNavigationData(usersListState.data);
      dispatch(usersCleanup());
    } else if (usersListState.error) {
      setUsersList(null);
      setError(usersListState.error);
      dispatch(usersCleanup());
    }
  }, [usersListState]);

  const navigate = (data) => {
    dispatch(users({ ...data, limit: 10 }));
  };

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
            setVisibility(null);
          } catch (error) {
            toast("something went wrong");
          }
        },
      },

      {
        title: "Verify",
        onClick: async (_id) => {
          try {
            setIsSending(_id);
            const result = await AxiosCall({
              method: "GET",
              path: "admin/verify/" + _id,
            });

            if (result.status == 200) {
              const rawList = usersList;
              const selectedUser = usersList.users.findIndex(
                (item) => item._id == _id
              );
              rawList.users[selectedUser].verifiedBusiness = "yes";
              setUsersList({ ...usersList, rawList });
              message.success({ content: "User Verified", key, duration: 2 });
              setVisibility(null);
            } else {
              message.error({ content: "An error occurred", key, duration: 2 });
              setVisibility(null);
            }

            setIsSending(0);
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
              path: "admin/suspend/" + _id,
              data: {
                month: 0,
                week: 2,
              },
            });
            setIsSending(0);

            if (result.status == 200) {
              const rawList = usersList;
              const selectedUser = usersList.users.findIndex(
                (item) => item._id == _id
              );
              rawList.users[selectedUser].suspended.value = true;
              setUsersList({ ...usersList, rawList });
              message.success({ content: "User suspended", key, duration: 2 });
              setVisibility(null);
            } else {
              message.error({ content: "An error occurred", key, duration: 2 });
              setVisibility(null);
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
              path: "admin/suspend/" + _id,
              data: {
                month: 1,
                week: 0,
              },
            });
            setIsSending(0);

            if (result.status == 200) {
              const rawList = usersList;
              const selectedUser = usersList.users.findIndex(
                (item) => item._id == _id
              );
              rawList.users[selectedUser].suspended.value = true;
              setUsersList({ ...usersList, rawList });
              message.success({ content: "User suspended", key, duration: 2 });
              setVisibility(null);
            } else {
              message.error({ content: "An error occurred", key, duration: 2 });
              setVisibility(null);
            }
          } catch (error) {
            toast("something went wrong");
          }
        },
      },
      {
        title: "lift suspention",
        onClick: async (_id) => {
          try {
            setIsSending(_id);
            const result = await AxiosCall({
              method: "POST",
              path: "admin/suspend/" + _id,
            });
            setIsSending(0);

            if (result.status == 200) {
              const rawList = usersList;
              const selectedUser = usersList.users.findIndex(
                (item) => item._id == _id
              );
              rawList.users[selectedUser].suspended.value = false;
              setUsersList({ ...usersList, rawList });
              message.success({
                content: "Suspension lifted",
                key,
                duration: 2,
              });
              setVisibility(null);
            } else {
              message.error({ content: "An error occurred", key, duration: 2 });
              setVisibility(null);
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
            setIsSending(_id);
            const result = await AxiosCall({
              method: "DELETE",
              path: "users/" + _id,
            });
            setIsSending(0);

            if (result.status == 200) {
              const rawList = usersList;
              const selectedUser = usersList.users.findIndex(
                (item) => item._id == _id
              );
              rawList.users.splice(selectedUser, 1);
              setUsersList({ ...usersList, rawList });
              message.success({ content: "User Deleted", key, duration: 2 });
              setVisibility(null);
            } else {
              message.error({ content: "An error occurred", key, duration: 2 });
              setVisibility(null);
            }

            setVisibility(null);
          } catch (error) {
            setIsSending(0);
            message.error({
              content: error.response.data.message,
              key,
              duration: 2,
            });
          }
        },
      },
    ],
  };

  const sortVerify = (arg) => {
    const result = navigationData.users.filter(
      (user) => user.verifiedBusiness === arg
    );
    setUsersList(result);
  };
  const sortSuspened = (arg) => {
    const result = navigationData.users.filter(
      (user) => user.suspended.value === arg
    );
    setUsersList(result);
  };

  return (
    <div className="admin-dashboard lofty-admin-dashboard">
      <Container>
        <h3>Dashboard</h3>
        <Row>
          <Col md="3" sm="6">
            <Card className="admin-cards earning">
              <FontAwesomeIcon
                style={{
                  fontSize: "44px",
                  marginLeft: "10px",
                  marginRight: "20px",
                }}
                cursor="pointer"
                icon={faCar}
                color="#42B145"
              />
              <div className="card-content">
                <span>Earnings</span>
                <h4 className="value">${siteStats.data.adminData.earnings}</h4>
              </div>
            </Card>
          </Col>
          <Col md="3" sm="6">
            <Card className="admin-cards products">
              <FontAwesomeIcon
                style={{
                  fontSize: "44px",
                  marginLeft: "10px",
                  marginRight: "20px",
                }}
                cursor="pointer"
                icon={faCar}
                color="#0097F0"
              />
              <div className="card-content">
                <span>Total Products</span>
                <h4 className="value">
                  {siteStats.data.adminData.totalProducts}
                </h4>
              </div>
            </Card>
          </Col>
          <Col md="3" sm="6">
            <Card className="admin-cards programs">
              <FontAwesomeIcon
                style={{
                  fontSize: "44px",
                  marginLeft: "10px",
                  marginRight: "20px",
                }}
                cursor="pointer"
                icon={faCar}
                color="#F73464"
              />
              <div className="card-content">
                <span>Total Programs</span>
                <h4 className="value">
                  {siteStats.data.adminData.totalPrograms}
                </h4>
              </div>
            </Card>
          </Col>
          <Col md="3" sm="6">
            <Card className="admin-cards users">
              <FontAwesomeIcon
                style={{
                  fontSize: "44px",
                  marginLeft: "10px",
                  marginRight: "20px",
                }}
                cursor="pointer"
                icon={faCar}
                color="#FDBF00"
              />
              <div className="card-content">
                <span>Total users</span>
                <h4 className="value">{siteStats.data.adminData.totalUsers}</h4>
              </div>
            </Card>
          </Col>
        </Row>
        <br />
        <br />

        <div className="d-flex justify-content-between mb-3">
          <h3
            style={{
              color: "#242B27",
              fontSize: "24px",
              fontWeight: "700",
              fontFamily: "Maven Pro, sans-serif",
            }}
          >
            All users
          </h3>

          <div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
              <DropdownToggle className="dropdown-btn" caret>
                Sort by
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  className="dropdown-item"
                  onClick={() => sortVerify(true)}
                >
                  Verified
                </DropdownItem>
                <DropdownItem
                  className="dropdown-item"
                  onClick={() => sortVerify(false)}
                >
                  Unverified
                </DropdownItem>
                <DropdownItem
                  className="dropdown-item"
                  onClick={() => sortSuspened(true)}
                >
                  Suspended
                </DropdownItem>
                <DropdownItem
                  className="dropdown-item"
                  onClick={() => sortSuspened(false)}
                >
                  Unsuspended
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table borderless">
            <thead>
              <tr>
                <th scope="col" className="col-3">
                  User ID
                </th>
                <th scope="col" className="col-3">
                  User Email
                </th>
                <th scope="col" className="col-2">
                  User Type
                </th>
                <th scope="col" className="col-1 text-center">
                  Suspended?
                </th>
                <th scope="col" className="col-1 text-center">
                  Verified?
                </th>
                <th scope="col" className="col-1 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            {error && <p>{error}</p>}

            {usersList &&
              usersList.map((user, key) => (
                <tbody key={key}>
                  <tr>
                    <td>{user._id}</td>
                    <td> {user.email}</td>
                    <td>{user.role}</td>
                    <td className="text-center">
                      <span
                        className="p-2"
                        style={{
                          backgroundColor: user.suspended.value
                            ? "#8CF6CA"
                            : "#F7B28C",
                          borderRadius: "8px",
                        }}
                      >
                        {user.suspended.value ? "yes" : "no"}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className="p-2"
                        style={{
                          backgroundColor: user.verifiedBusiness
                            ? "#8CF6CA"
                            : "#F7B28C",
                          borderRadius: "8px",
                        }}
                      >
                        {user.verifiedBusiness ? "yes" : "no"}
                      </span>
                    </td>
                    <td className="delete-action">
                      <Popover
                        content={
                          isSending === user._id ? (
                            <Loader />
                          ) : (
                            <ul id="action-list">
                              {user.suspended.value
                                ? actions.moreOptions.map(
                                    (option, index) =>
                                      option.title === "lift suspention" && (
                                        <li
                                          className="action-items"
                                          onClick={() =>
                                            option.onClick(user._id)
                                          }
                                          key={index}
                                        >
                                          {option.title}
                                        </li>
                                      )
                                  )
                                : actions.moreOptions.map(
                                    (option, index) =>
                                      option.title !== "lift suspention" && (
                                        <>
                                          {option.title !== "Verify" ? (
                                            <li
                                              className="action-items"
                                              onClick={() =>
                                                option.onClick(user._id)
                                              }
                                              key={index}
                                            >
                                              {option.title}
                                            </li>
                                          ) : (
                                            !user.verifiedBusiness && (
                                              <li
                                                className="action-items"
                                                onClick={() =>
                                                  option.onClick(user._id)
                                                }
                                                key={index}
                                              >
                                                {option.title}
                                              </li>
                                            )
                                          )}
                                        </>
                                      )
                                  )}
                            </ul>
                          )
                        }
                        trigger="click"
                        visible={visibility === user._id ? true : false}
                        onVisibleChange={() => {
                          if (visibility === null) {
                            setVisibility(user._id);
                          } else {
                            setVisibility(null);
                          }
                        }}
                      >
                        <MoreOutlined />
                      </Popover>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>

        {usersList && <Paginate data={navigationData} navigate={navigate} />}
      </Container>
      {userProfileModal && (
        <ModalWrapper ref={userProfileRef} onClick={closeModal}>
          <Modal>
            {!userData ? (
              <Loader />
            ) : (
              <>
                <div className="profile-overview">
                  <div className="img-wrapper">
                    <img src={userData.avatar.secure_url} alt="" />
                  </div>
                  <div className="user-info">
                    <span>{userData.name}</span>
                  </div>
                </div>

                <ul>
                  <li>
                    <span>Email: </span> <span>{userData.email}</span>
                  </li>
                  <li>
                    <span>Business: </span> <span>{userData.businessType}</span>
                  </li>
                  <li>
                    <span>Phone: </span> <span>{userData.phoneNo}</span>
                  </li>
                  <li>
                    <span>City: </span> <span>{userData.city}</span>
                  </li>
                  <li>
                    <span>State: </span> <span>{userData.state}</span>
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

export default Dashboard;
