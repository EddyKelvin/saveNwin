import "./index.css";

import React from "react";
import { Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Loader from "../Loader/Index";

const List = ({
  data,
  error,
  actions,
  isLoading,
  visibility,
  setVisibility,
}) => {
  const { showUserDetails, moreOptions } = actions;

  return (
    <div className="table-wrapper">
      <div className="table">
        <li className="table-head" id="top-level">
          <span className="user-id">User ID</span>
          <span className="user-email">User Email</span>
          <span className="user-type">User type</span>
          <span className="verification">Suspended?</span>
          <span className="verification">User Verified?</span>
          <span className="actions">Actions</span>
        </li>
        {error && <li>{error}</li>}
        <ul className="table-body">
          {data &&
            data.map((user, key) => (
              <li className="all-users" key={key}>
                <span className="items user-id">{user._id}</span>
                <span
                  className="items user-email"
                  onClick={() => showUserDetails(user._id)}
                >
                  {user.email}
                </span>
                <span className="items user-type">{user.role}</span>
                <span className="items verification">
                  <b
                    style={{
                      backgroundColor: user.verifiedBusiness
                        ? "#8CF6CA"
                        : "#F7B28C",
                    }}
                  >
                    {user.suspended.value ? "yes" : "no"}
                  </b>
                </span>
                <span className="items verification">
                  <b
                    style={{
                      backgroundColor: user.verifiedBusiness
                        ? "#8CF6CA"
                        : "#F7B28C",
                    }}
                  >
                    {user.verifiedBusiness ? "yes" : "no"}
                  </b>
                </span>
                <span className="items actions">
                  <Popover
                    content={
                      isLoading === user._id ? (
                        <Loader />
                      ) : (
                        <ul id="action-list">
                          {user.suspended.value
                            ? moreOptions.map(
                                (option, index) =>
                                  option.title === "lift suspention" && (
                                    <li
                                      className="action-items"
                                      onClick={() => option.onClick(user._id)}
                                      key={index}
                                    >
                                      {option.title}
                                    </li>
                                  )
                              )
                            : moreOptions.map(
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
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
