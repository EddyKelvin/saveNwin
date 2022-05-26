/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../../../../Components/CustomerUsersList";
import { ModalWrapper, Modal, SearchWrapper } from "./styles";
import Paginate from "../../../../Components/Paginate";
import Loader from "../../../../Components/Loader/Index";
import { users, usersCleanup } from "../../../../Store/actions/users";
import AxiosCall from "../../../../Utils/axios";
import { toast } from "react-toast";
import { message } from "antd";

const CustomerList = () => {
  const key = "updatable";
  const userListState = useSelector((s) => s.users);
  const [userList, setUserList] = useState(null);
  const [isSending, setIsSending] = useState(0);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userProfileModal, setUserProfileModal] = useState(false);
  const dispatch = useDispatch();
  const userProfileRef = useRef(null);
  const [visibility, setVisibility] = useState(null);
  const searchQuery = useRef({ name: "", email: "" });
  const [isSearching, setIsSearching] = useState(false);

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
            if (result.status == 200) {
              setUserData(result.data);
              setVisibility(null);
            } else {
              message.error({ content: "An error occurred", key, duration: 2 });
              setVisibility(null);
            }

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
              path: "admin/suspend/" + _id,
              data: {
                month: 0,
                week: 2,
              },
            });
            setIsSending(0);

            if (result.status == 200) {
              const rawList = userList;
              const selectedUser = userList.users.findIndex(
                (item) => item._id == _id
              );
              rawList.users[selectedUser].suspended.value = true;
              setUserList({ ...userList, rawList });
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
              const rawList = userList;
              const selectedUser = userList.users.findIndex(
                (item) => item._id == _id
              );
              rawList.users[selectedUser].suspended.value = true;
              setUserList({ ...userList, rawList });
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
              const rawList = userList;
              const selectedUser = userList.users.findIndex(
                (item) => item._id == _id
              );
              rawList.users[selectedUser].suspended.value = false;
              setUserList({ ...userList, rawList });
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
            const result = await AxiosCall({
              method: "DELETE",
              path: "users/" + _id,
            });
            dispatch(users({ role: "business" }));
            toast("successful");
            setVisibility(null);
          } catch (error) {
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

  const navigate = (data) => {
    dispatch(
      users({
        ...data,
        role: "customer",
      })
    );
  };

  const searchUser = async () => {
    setIsSearching(true);
    try {
      const result = await AxiosCall({
        method: "GET",
        path: `users/search?email=${searchQuery.current.name}`,
      });
      setUserList({ users: result.data.users });

      setIsSearching(false);
    } catch (error) {
      setIsSearching(false);
      message.error({ content: error.response.data.message, key, duration: 2 });
    }
  };

  return (
    <div className="customer-list container">
      <h3>Customers</h3>
      <SearchWrapper>
        <input
          type="text"
          onChange={(e) => {
            searchQuery.current = {
              ...searchQuery.current,
              name: e.target.value,
            };
          }}
        />
        <button onClick={searchUser}>
          {isSearching ? <Loader size={"20px"} /> : "Search"}
        </button>
      </SearchWrapper>
      <List
        data={userList}
        error={error}
        actions={actions}
        isLoading={isSending}
        setVisibility={setVisibility}
        visibility={visibility}
      />
      {userList && <Paginate data={userList} navigate={navigate} />}
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

export default CustomerList;
