/* eslint-disable react-hooks/exhaustive-deps */
import "./index.css";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "antd";

// ACTIONS
import {
  getTransaction,
  getTransactionCleanup,
} from "../../../Store/actions/bussiness/get-transaction";

const TransactionHistory = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const getTransactionState = useSelector((state) => state.getTransaction);
  const [transactions, setTransaction] = useState([]);
  const userState = useSelector((state) => state.getMe);

  useEffect(() => {
    dispatch(getTransaction());
  }, []);

  useEffect(() => {
    if (getTransactionState.isSuccessful) {
      setTransaction(getTransactionState.data);
      dispatch(getTransactionCleanup());
    } else if (getTransactionState.error) {
      setTransaction(null);
      dispatch(getTransactionCleanup());
    }
  }, [getTransactionState]);

  const onSearch = (value) => dispatch(getTransaction(value));

  return (
    <div className="transaction-list-container">
      <h1>Transaction History</h1>

      <hr />
      {transactions && (
        <>
          {transactions.length === 0 ? (
            <p>No Transactions found</p>
          ) : (
            <div className="search-container">
              <Search
                className="search-input"
                placeholder="Search by title"
                onSearch={onSearch}
                enterButton
              />
            </div>
          )}
        </>
      )}

      {getTransactionState.isLoading ? (
        <div className="text-center py-5">
          <LoadingOutlined style={{ fontSize: 30 }} spin />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table borderless">
            {transactions.length === 0 ? null : (
              <thead>
                <tr>
                  <th scope="col" className="col-1">
                    No.
                  </th>

                  <th scope="col" className="col-2">
                    {userState.data.user.role === "business"
                      ? "Buyer Email"
                      : "Seller Email"}
                  </th>

                  <th scope="col" className="col-2">
                    Title
                  </th>

                  <th scope="col" className="col-2">
                    Transaction ID
                  </th>

                  <th scope="col" className="col-1">
                    Date
                  </th>
                </tr>
              </thead>
            )}

            {transactions.length !== 0 &&
              transactions.map((item, index) => (
                <tbody key={index}>
                  <tr className="all-products">
                    <td>{index + 1}.</td>

                    {userState.data.user.role === "customer" ? (
                      <td>{item.owner.email}</td>
                    ) : (
                      <td>{item.buyer.email}</td>
                    )}

                    <td>
                      {item.program == null
                        ? "not available"
                        : item.program.title}
                    </td>

                    <td>
                      {item.program == null
                        ? "not available"
                        : item.transactionID}
                    </td>

                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
