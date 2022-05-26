/* eslint-disable react-hooks/exhaustive-deps */
import "./index.css";

import React, { useEffect, useState } from "react";

import UserProfile from "./userprofile/userProfile";
import EditProfile from "./userprofile/editProfile";
import Button from "../../../Components/customButton/button";
import { getMe, getMeCleanup } from "../../../Store/actions/getMe";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BusinessDashboard = () => {
  const [user, setUser] = useState({});
  const getMeState = useSelector((s) => s.getMe);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  useEffect(() => {
    if (getMeState.isSuccessful) {
      setUser(getMeState.data.user);
      dispatch(getMeCleanup());
    } else if (getMeState.error) {
      history.push("/login");
      dispatch(getMeCleanup());
    }
  }, [getMeState]);

  return (
    <div className="dashboard-container container">
      <div className="dashboard-inner">
        <h6 style={{ fontWeight: "bolder" }}>Profile Account</h6>
        <div className="dashboard-content row">
          <div className="dashboard-column1 col-md-6">
            <UserProfile user={user} />
            <EditProfile user={user} />
          </div>

          {getMeState.data.user.role === "business" ? (
            <div className="dasboard-column2 col-md-6">
              <div className="column-wrapper">
                <div className="row">
                  <span>Upload a new Item</span>
                  <Link to="/account/create-program" style={{ width: "auto" }}>
                    <Button
                      width={90}
                      br={5}
                      mt={15}
                      color="#FF4C4F"
                      brColor="#FF4C4F"
                      height={35}
                      title="Upload"
                    />
                  </Link>
                </div>
                <div className="row">
                  <span>Create a new VIP program</span>
                  <Link
                    to="/account/create-vip-program"
                    style={{ width: "auto" }}
                  >
                    <Button
                      width={90}
                      br={5}
                      mt={15}
                      color="#FF4C4F"
                      brColor="#FF4C4F"
                      height={35}
                      title="post"
                    />
                  </Link>
                </div>
                <div className="row" style={{ marginTop: 20 }}>
                  <span>Transaction History</span>
                  <Link to="/account/transactions" style={{ width: "auto" }}>
                    <Button
                      width={90}
                      br={5}
                      mt={15}
                      color="#FF4C4F"
                      brColor="#FF4C4F"
                      height={35}
                      title="view"
                    />
                  </Link>
                </div>
                <div className="row" style={{ marginTop: 20 }}>
                  <span>Your Items</span>
                  <Link to="/account/items" style={{ width: "auto" }}>
                    <Button
                      width={90}
                      br={5}
                      mt={15}
                      color="#FF4C4F"
                      brColor="#FF4C4F"
                      height={35}
                      title="view"
                    />
                  </Link>
                </div>

                <div className="row" style={{ marginTop: 20 }}>
                  <span>Scan Codes</span>
                  <Link to="/account/qrcodes/open" style={{ width: "auto" }}>
                    <Button
                      width={90}
                      br={5}
                      mt={15}
                      color="#FF4C4F"
                      brColor="#FF4C4F"
                      height={35}
                      title="view"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
