/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
//MODULES AND PACKAGES
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QrReader from "react-qr-reader";
import QRCode from "qrcode.react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Button from "../../../Components/customButton/button";

//ACTIONS
import { scanCode, scanCodeCleanup } from "../../../Store/actions/scanCode";
import {
  redeemCode,
  redeemCodeCleanup,
} from "../../../Store/actions/redeemCode";
import {
  unredeemedCodes,
  unredeemedCodesCleanup,
} from "../../../Store/actions/unredeemedCodes";

//STYLES
import "./index.css";
// import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { message, Pagination, Modal } from "antd";
// import { Pagination } from "antd";

const UnredeemedCodes = (props) => {
  const dispatch = useDispatch();
  const scanCodeState = useSelector((state) => state.scanCode);
  const redeemCodeState = useSelector((state) => state.redeemCode);
  const unredeemedCodesState = useSelector((state) => state.unredeemedCodes);
  const userState = useSelector((state) => state.getMe);

  const [result, setResult] = useState("");
  const [item, setItem] = useState({});
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);

  const [unredeemedList, setUnredeemedList] = useState("");
  const [currentItem, setCurrentItem] = useState([]);



  // FOR SCANNING MODAL
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

  // FOR CODE GENERATION MODAL
  const [isGenModalVisible, setIsGenModalVisible] = useState(false);

  const showGenModal = () => {
    setIsGenModalVisible(true);
  };

  const genHandleOk = () => {
    setIsGenModalVisible(false);
  };

  const genHandleCancel = () => {
    setIsGenModalVisible(false);
  };

  const showCustomerModal = (data) => {
    showGenModal();
    setCurrentItem(data);
  };

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const changePage = (page) => {
    dispatch(unredeemedCodes({ page: page, limit: 20 }));
  };

  const handleError = (error) => {
    message.error(error);
  };

  const redeemScannedCode = () => {
    dispatch(redeemCode(result));
  };

  useEffect(() => {
    dispatch(unredeemedCodes({ page: page, limit: 20 }));
  }, []);

  useEffect(() => {
    if (unredeemedCodesState.isSuccessful) {
      setUnredeemedList(unredeemedCodesState.data);
      dispatch(unredeemedCodesCleanup());
    } else if (unredeemedCodesState.error) {
      setUnredeemedList(null);
      dispatch(unredeemedCodesCleanup());
    }
  }, [unredeemedCodesState]);

  useEffect(() => {
    if (result) {
      dispatch(scanCode(result));
    }
  }, [result]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (scanCodeState.isSuccessful) {
      setItem(scanCodeState.data.productID);
      dispatch(scanCodeCleanup());
    } else if (scanCodeState.error) {
      message.error(scanCodeState.error);
      dispatch(scanCodeCleanup());
    }
  }, [scanCodeState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (redeemCodeState.isSuccessful) {
      setMsg(redeemCodeState.data);
      dispatch(unredeemedCodes({ page: page, limit: 20 }));
      dispatch(redeemCodeCleanup());
    } else if (redeemCodeState.error) {
      setMsg(redeemCodeState.error);
      dispatch(redeemCodeCleanup());
    }
  }, [redeemCodeState]);

  return (
    <section className="unredeemed-code-container">
      <h1>Unredeemed codes</h1>

      <hr />

      <div>
        <p className="mt-0 pt-0 font-weight-bold">
          Total unredeemed items : {unredeemedList.totalQRCodes}
        </p>
      </div>

      {unredeemedList.QRCodes && unredeemedList.QRCodes.length === 0 ? null : (
        <>
          {userState.data.user.role === "business" ? (
            <div>
              <p>Scan customer's Qr Codes</p>

              <div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    showModal();
                  }}
                >
                  Scan Code
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}

      {/* QR READER MODAL  */}
      <Modal
        title="Scan Item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="scanner-body">
          {!result && (
            <>
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                className="qr-reader"
              />

              <p className="mt-3">
                Kindly place the QR Code inside the area to claim your coupon.
                Scanning will start automatically.
              </p>
            </>
          )}
        </div>

        <div>
          {result && (
            <div className="scanned-result">
              <div className="result-img-container">
                <img
                  className="product-img"
                  src={item.item.avatar ? item.item.avatar.secure_url : ""}
                  alt={item.item.title}
                />
              </div>

              <div className="result-details">
                <h4>{item.item.title}</h4>

                <p>
                  Brand: <span>{item.item.brand}</span>
                </p>
                <p>
                  Type: <span>{item.item.productType}</span>
                </p>
                <p>
                  Category: <span>{item.item.category}</span>
                </p>

                <p>
                  Selling price: <span>${item.item.sellingPrice}</span>
                </p>
                <p>
                  Discount: <span> ${item.item.discount} </span>
                </p>

                <h5>Description</h5>
                <p id="description">{item.item.description}</p>
              </div>
            </div>
          )}

          <Button
            title="Redeem item"
            color="#fff"
            mt={30}
            mb={10}
            br={8}
            bg="#FF4C4F"
            height={35}
            width={110}
            onclick={redeemScannedCode}
            disabled={!result}
          />
          <p>{msg}</p>
        </div>
      </Modal>

      {/* QRCODE GENERATOR MODAL FOR CUSTOMER */}
      <Modal
        title="Item Code"
        visible={isGenModalVisible}
        onOk={genHandleOk}
        onCancel={genHandleCancel}
        footer={null}
      >
        <div id="generator-container">
          <QRCode id={currentItem._id} value={currentItem._id} size={170} />
        </div>

        <div className="mt-4">
          <h5>Seller's Information</h5>
          <hr />

          {currentItem.seller && (
            <>
              <h6 className="mb-0">Business Name:</h6>
              <p>{currentItem.seller.businessName}</p>

              <h6 className="mb-0">Address:</h6>
              <p>{currentItem.seller.address}</p>

              <h6 className="mb-0">State:</h6>
              <p>{currentItem.seller.state}</p>

              <h6 className="mb-0">City:</h6>
              <p>{currentItem.seller.city}</p>

              <h6 className="mb-0">Phone number:</h6>
              <p>{currentItem.seller.phoneNo}</p>

              <h6 className="mb-0">Email:</h6>
              <p>{currentItem.seller.email}</p>
            </>
          )}
        </div>
      </Modal>

      {/* TABLE  */}
      {unredeemedCodesState.isLoading ? (
        <div className="text-center py-5">
          <LoadingOutlined style={{ fontSize: 30 }} Spin />
        </div>
      ) : (
        <div className="table-responsive mt-4">
          <table className="table borderless mb-5">
            {unredeemedList.QRCodes &&
            unredeemedList.QRCodes.length === 0 ? null : (
              <thead>
                <tr>
                  <th scope="col" className="col">
                    No.
                  </th>

                  <th scope="col" className="col-2">
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

                  {userState.data.user.role === "business" ? null : (
                    <th scope="col" className="col-2">
                      action
                    </th>
                  )}
                </tr>
              </thead>
            )}

            {unredeemedList.QRCodes &&
              unredeemedList.QRCodes.map((item, index) => (
                <tbody key={item._id}>
                  <tr>
                    <th scope="row">{index + 1}</th>

                    {userState.data.user.role === "customer" ? (
                      <td style={{ fontSize: "13px" }} className="text-break">
                        {item.seller.email}
                      </td>
                    ) : (
                      <td style={{ fontSize: "13px" }} className="text-break">
                        {item.customerID.email}
                      </td>
                    )}

                    <td style={{ fontSize: "13px" }} className="text-break">
                      {" "}
                      {item.productID.item.title}
                    </td>

                    <td style={{ fontSize: "13px" }} className="text-break">
                      ${item.productID.item.sellingPrice}
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

                    {userState.data.user.role === "business" ? null : (
                      <td style={{ fontSize: "13px" }} className="text-break">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => showCustomerModal(item)}
                        >
                          Generate
                        </button>
                      </td>
                    )}
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      )}

      <div className="d-flex justify-content-end pb-5 pt-4">
        <Pagination
          onChange={changePage}
          total={unredeemedList.totalQRCodes}
          hideOnSinglePage={true}
        />
      </div>
    </section>
  );
};

export default UnredeemedCodes;
