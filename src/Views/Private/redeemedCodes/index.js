/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
//MODULES AND PACKAGES
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

// ACTIONS
import {
  redeemedCodes,
  redeemedCodesCleanup,
} from "../../../Store/actions/redeemedCodes";

import "./index.css";
import { Pagination } from "antd";

const RedeemedCodesList = () => {
  const dispatch = useDispatch();
  const redeemedCodeState = useSelector((state) => state.redeemedCodes);
  const userState = useSelector((state) => state.getMe);

  const [redeemedList, setRedeemedList] = useState("");
  const [page, setPage] = useState(1);

  const changePage = (page) => {
    dispatch(redeemedCodes({ page: page, limit: 20 }));
  };

  useEffect(() => {
    dispatch(redeemedCodes({ page: page, limit: 20 }));
  }, []);

  useEffect(() => {
    if (redeemedCodeState.isSuccessful) {
      setRedeemedList(redeemedCodeState.data);
      dispatch(redeemedCodesCleanup());
    } else if (redeemedCodeState.error) {
      dispatch(redeemedCodesCleanup());
    }
  }, [redeemedCodeState]);

  return (
    <section className="redeemed-code-container">
      <h1>Redeemed codes</h1>
      <hr />
      <p className="mt-0 pt-0 font-weight-bold">
        Total redeemed items : {redeemedList.totalQRCodes}
      </p>

      {redeemedCodeState.isLoading ? (
        <div className="text-center py-5">
          <LoadingOutlined style={{ fontSize: 30 }} />
        </div>
      ) : (
        <div className="table-responsive mt-4">
          <table className="table borderless mb-5">
            {redeemedList.QRCodes &&
            redeemedList.QRCodes.length === 0 ? null : (
              <thead>
                <tr>
                  <th scope="col" className="col-1">
                    No.
                  </th>

                  <th scope="col" className="col-3">
                    {userState.data.user.role === "business"
                      ? "Buyer Email"
                      : "Seller Email"}
                  </th>

                  <th scope="col" className="col-2">
                    Item
                  </th>

                  <th scope="col" className="col-1">
                    Amount paid
                  </th>

                  <th scope="col" className="col-2">
                    Address
                  </th>

                  <th scope="col" className="col-2">
                    City
                  </th>

                  <th scope="col" className="col-2">
                    State
                  </th>
                </tr>
              </thead>
            )}

            {redeemedList.QRCodes &&
              redeemedList.QRCodes.map((item, index) => (
                <tbody key={item._id}>
                  <tr>
                    <th scope="row">{index + 1}</th>

                    {userState.data.user.role === "business" ? (
                      <td style={{ fontSize: "13px" }} className="text-break">
                        {item.customerID.email}
                      </td>
                    ) : (
                      <td style={{ fontSize: "13px" }} className="text-break">
                        {item.seller.email}
                      </td>
                    )}

                    <td style={{ fontSize: "13px" }} className="text-break">
                      {" "}
                      {item.productID.title}
                    </td>

                    <td style={{ fontSize: "13px" }} className="text-break">
                      ${(item.productID.sellingPrice = item.productID.discount)}
                    </td>

                    <td style={{ fontSize: "13px" }} className="text-break">
                      {item.seller.address}
                    </td>

                    <td style={{ fontSize: "13px" }} className="text-break">
                      {item.seller.city}
                    </td>

                    <td style={{ fontSize: "13px" }} className="text-break">
                      {item.seller.state}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      )}

      <div className="d-flex justify-content-end pb-5 pt-4">
        <Pagination
          onChange={changePage}
          total={redeemedList.totalQRCodes}
          hideOnSinglePage={true}
        />
      </div>
    </section>
  );
};

export default RedeemedCodesList;
