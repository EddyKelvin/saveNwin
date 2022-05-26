/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalWrapper, Modal, SearchWrapper } from "./styles";
import List from "../../../../Components/AffiliateList";
import Paginate from "../../../../Components/Paginate";
import Loader from "../../../../Components/Loader/Index";
import { users, usersCleanup } from "../../../../Store/actions/users";
import AxiosCall from "../../../../Utils/axios";
import { toast } from "react-toast";
import { message } from "antd";

const AffiliateList = () => {
  const key = "updatable";
  const userListState = useSelector((s) => s.users);
  const [userList, setUserList] = useState(null);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(0);
  const [userData, setUserData] = useState(null);
  const [userProfileModal, setUserProfileModal] = useState(false);
  const userProfileRef = useRef(null);
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(null);

  const [isPaying, setIsPaying] = useState(false);
  const searchQuery = useRef({ name: "", email: "" });
  const [isSearching, setIsSearching] = useState(false);

  const payUser = async () => {
    try {
      setIsPaying(true);
      const result = await AxiosCall({ method: "GET", path: "admin/pay" });

      if (result.status == 200) {
        message.success({
          content: "User Paid successfully",
          key,
          duration: 2,
        });
      } else {
        message.error({ content: "An error occurred", key, duration: 2 });
      }
      setIsPaying(false);
    } catch (error) {
      message.error({ content: "An error occurred", key, duration: 2 });
      setIsPaying(false);
    }
  };

  useEffect(() => {
    dispatch(users({ role: "affiliate" }));
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
              const rawList = userList;
              const selectedUser = userList.users.findIndex(
                (item) => item._id == _id
              );
              rawList.users[selectedUser].verifiedBusiness = "yes";
              setUserList({ ...userList, rawList });
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
            message.error({
              content: error.request.responsee,
              key,
              duration: 2,
            });
            setVisibility(null);
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
            // dispatch(users({ role: 'business' }))
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
        role: "affiliate",
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

      console.log(result.data.users);
      setIsSearching(false);
    } catch (error) {
      setIsSearching(false);
      message.error({ content: error.response.data.message, key, duration: 2 });
    }
  };

  console.log(userList);

  return (
    <div className="affiliate-list container">
      <h3>Affiliate Accounts</h3>
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 20,
          background: "#099",
          cursor: "pointer",
          color: "#fff",
          padding: 0,
          width: 80,
          fontSize: 13,
          height: 35,
          borderRadius: 4,
        }}
        onClick={() => payUser()}
      >
        {isPaying ? <Loader size={"20px"} /> : "Pay"}
      </div>
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
                  <li>
                    <span>Earned referrals: </span>{" "}
                    <span>{userData.referralEarned}</span>
                  </li>
                  <li>
                    <span>Suspended: </span>{" "}
                    <span>{userData.suspended.value ? "Yes" : "No"}</span>
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

export default AffiliateList;
