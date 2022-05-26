/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
//MODULES AND PACKAGES
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";

import QRCode from "qrcode.react";
import { useHistory } from "react-router-dom";

// STYLES
import { Container, Row, Col } from "reactstrap";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

//ACTIONS
import {
  createUserPayment,
  createUserPaymentCleanup,
} from "../../Store/actions/userPayment";
import { addToCart } from "../../Store/actions/addToCart";

const PayPal = (props) => {
  const authState = useSelector((state) => state.auth);
  const paymentState = useSelector((state) => state.userPayment);
  const dispatch = useDispatch();
  const history = useHistory();

  const { item, id } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [qrCode, setQrCode] = useState([]);

  useEffect(() => {
    if (paymentState.isSuccessful) {
      setQrCode(paymentState.data);

      dispatch(createUserPaymentCleanup());
    } else if (paymentState.isLoading) {
      dispatch(createUserPaymentCleanup());
    } else if (paymentState.error) {
      dispatch(createUserPaymentCleanup());
    }
  }, [paymentState]);

  //CHECK IF PAYMENT IS SUCCESSFULL
  if (paidFor) {
    const downloadQRCode = (qrcode) => {
      const qrCodeURL = document
        .getElementById(qrcode._id)
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let aEl = document.createElement("a");
      aEl.href = qrCodeURL;
      aEl.download = `${qrcode.productID.title}.png`;
      document.body.appendChild(aEl);
      aEl.click();
      document.body.removeChild(aEl);
    };

    return (
      <div className="payment-success container my-5">
        <h4>
          PAYMENT SUCCESSFUL
          <br />
          <FontAwesomeIcon className="check-icon" icon={faCheck} />
        </h4>

        {qrCode[0] && (
          <div className="align-self-start text-start seller-info">
            <div className="fs-6 fw-semibold mb-2">Seller's information</div>

            <h6 className="mb-0">Business Name:</h6>
            <p>{qrCode[0].seller.businessName}</p>

            <h6 className="mb-0">Address:</h6>
            <p>{qrCode[0].seller.address}</p>

            <h6 className="mb-0">State:</h6>
            <p>{qrCode[0].seller.state}</p>

            <h6 className="mb-0">City:</h6>
            <p className="text-capitalize">{qrCode[0].seller.city}</p>

            <h6 className="mb-0">Phone number:</h6>
            <p className="text-capitalize">{qrCode[0].seller.phoneNo}</p>

            <h6 className="mb-0">Email:</h6>
            <p className="text-capitalize">{qrCode[0].seller.email}</p>
          </div>
        )}

        {/* GENERATE QRCODE  */}
        <div className="qr-container mt-5 align-self-start">
          {qrCode.map((qrcode) => (
            <div className="code-container" key={qrcode._id}>
              <div className="code">
                <QRCode id={qrcode._id} value={qrcode._id} size={170} />
                <p className="mb-0">
                  <small> {qrcode.productID.title} </small>
                </p>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => downloadQRCode(qrcode)}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  //CHECK IF PAYMENT FAILED
  if (error) {
    return (
      <div className="payment-error mt-5 container">
        <h2>ERROR IN PROCESSING ORDER. PLEASE RETRY AGAIN</h2>
      </div>
    );
  }

  //CHECK IS USER IS LOGGED IN
  if (authState.isLoggedIn === false) {
    history.go(0);
    history.push("/login");
  }

  if (authState.isLoggedIn) {
    return (
      <div className="payment-container mt-5">
        <Container>
          <Row>
            <Col sm="12" md={{ size: 4, offset: 4 }}>
              <h3 className="mb-5 text-center"> Pay with PayPal</h3>

              <div className="detail mb-5">
                <h4>
                  Program Name: <span> {item} </span>
                </h4>
                <h4>
                  Price: <span> $20.00 </span>
                </h4>
              </div>

              <PayPalButton
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: "20.01",
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  dispatch(
                    createUserPayment({
                      transactionID: data.orderID,
                      accessToken: data.facilitatorAccessToken,
                      programID: id,
                    })
                  );

                  dispatch(addToCart({ id: id, type: "remove" }));

                  setPaidFor(true);
                }}
                options={{
                  clientId:
                    "Af-lScZLClo7GUiHa4XYcNaSxuYZFZ4OBxGb3AlE_rU639DOfouXQvg20_qL-efDHbSYQlqEgqzt9u7s",
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default PayPal;
