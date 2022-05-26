/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, message } from "antd";
import { FlagFilled, LoadingOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./index.css";
import { Row, Col, Card, CardBody } from "reactstrap";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";

// ACTIONS
import {
  programDetails,
  programDetailsCleanup,
} from "../../Store/actions/programDetails";
import { addFlag, addFlagCleanup } from "../../Store/actions/flagging/addFlag";
import {
  deleteFlag,
  deleteFlagCleanup,
} from "../../Store/actions/flagging/deleteFlag";
import fromhome from "../../Assets/images/fromhome.png";
import PayPal from "../../Utils/pay-pal";

const ProgramDetails = () => {
  const history = useHistory();
  const { _id } = useParams();
  const dispatch = useDispatch();
  const programState = useSelector((s) => s.programDetails);
  const authState = useSelector((state) => state.auth);
  const addFlagState = useSelector((state) => state.addFlag);
  const deleteFlagState = useSelector((state) => state.deleteFlag);
  const userState = useSelector((state) => state.getMe);

  const [programs, setPrograms] = useState([]);
  const [programId, setProgramId] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flagMessage, setFlagMessage] = useState("");

  const flagProgram = () => {
    const msg = {
      message: flagMessage,
    };

    dispatch(addFlag({ programId, msg }));
  };

  const removeFlag = () => {
    dispatch(deleteFlag({ programId }));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(programDetails({ _id }));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (programState.isSuccessful) {
      setPrograms(programState.data);
      setProgramId(programState.data._id);

      dispatch(programDetailsCleanup());
    } else if (programState.error) {
      setPrograms(null);
      dispatch(programDetailsCleanup());
    }
  }, [programState]);

  useEffect(() => {
    if (addFlagState.isSuccessful) {
      setIsModalVisible(false);
      message.success("You have flagged this program");
      dispatch(programDetails({ _id }));
      dispatch(addFlagCleanup());
      setFlagMessage("");
    } else if (addFlagState.error) {
      dispatch(addFlagCleanup());
      message.error("Something went wrong, Try again later");
    }
  }, [addFlagState]);

  useEffect(() => {
    if (deleteFlagState.isSuccessful) {
      message.info("you have removed the flag from this program");
      dispatch(programDetails({ _id }));
      dispatch(deleteFlagCleanup());
    } else if (deleteFlagState.error) {
      message.error("Something went wrong, Try again later");
      dispatch(deleteFlagCleanup());
    }
  }, [deleteFlagState]);

  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

  const showTermsModal = () => {
    setIsTermsModalVisible(true);
  };

  const handleTermsOk = () => {
    setIsTermsModalVisible(false);
  };

  const handleTermsCancel = () => {
    setIsTermsModalVisible(false);
  };

  if (checkout) {
    return <PayPal id={programId} item={programs.title} />;
  }

  const openPaypal = (e) => {
    e.preventDefault();
    setCheckout(true);
  };

  return (
    <div className="program-details">
      <div className="program-detail-top">
        <div>
          <div
            className="program_image_container"
            style={{
              backgroundImage: `url(${fromhome})`,
            }}
          />
        </div>

        <div>
          <h6 className="title">{programs.title}</h6>
          <p className="state">
            {programs.city}, {programs.state}
          </p>

          <div className="program-detail-info">
            <p>
              In stock:
              <span>{programs.stock}</span>
            </p>
            <p>
              No of Products:
              <span>{programs.products && programs.products.length}</span>
            </p>
            <p>
              Original Price:
              <span>${programs.totalSellingPrice}.00</span>
            </p>
            <p>
              saving:
              <span>${programs.totalDiscount}.00</span>
            </p>
            <p>
              Minority?:
              <span>{programs?.owner?.minority ? "Yes" : "No"}</span>
            </p>
          </div>

          <div className="buy-btn-container mt-2">
            <div>
              {userState.data && userState.data.user.role === "business" ? (
                <button onClick={() => history.push("/signup")}>
                  Sign up as customer to purchase
                </button>
              ) : (
                <button
                  // onClick={() => setCheckout(true)}
                  onClick={showTermsModal}
                >
                  Purchase Program
                </button>
              )}
            </div>
          </div>

          <div className="action-btns">
            {authState.isLoggedIn && (
              <>
                {(() => {
                  if (programs.flag === false) {
                    return (
                      <button className="flag-btn" onClick={() => showModal()}>
                        <FlagFilled
                          style={{ color: "rgb(84, 84, 84)", fontSize: "15px" }}
                        />
                        <span
                          className="mx-2 fw-bold"
                          style={{ fontSize: "12px" }}
                        >
                          Flag
                        </span>
                      </button>
                    );
                  }
                  if (programs.flag && programs.youFlagged) {
                    return (
                      <button className="flag-btn" onClick={() => removeFlag()}>
                        <FlagFilled
                          style={{ color: "#cc0404", fontSize: "15px" }}
                        />
                        <span
                          className="mx-2 fw-bold"
                          style={{ fontSize: "12px" }}
                        >
                          Remove flag
                        </span>
                      </button>
                    );
                  }
                  if (programs.flag && programs.youFlagged === false) {
                    return (
                      <button className="flag-btn" onClick={() => showModal()}>
                        <FlagFilled
                          style={{ color: "#c7c402", fontSize: "15px" }}
                        />
                        <span
                          className="mx-2 fw-bold"
                          style={{ fontSize: "12px" }}
                        >
                          flag program
                        </span>
                      </button>
                    );
                  }
                })()}
              </>
            )}

            <div className="share-btn">
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <WhatsappShareButton
                url={window.location.href}
                style={{ marginLeft: "10px" }}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <TwitterShareButton
                url={window.location.href}
                style={{ marginLeft: "10px" }}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>

      <div className="program-detail-bottom mt-5">
        <Row xs="2" md="3" lg="4">
          {programs.products &&
            programs.products.map((product) => (
              <Col key={product._id} className="col mb-4">
                <Link to={`/products/${product._id}`}>
                  <Card className="product_card">
                    <div
                      className="product_avatar"
                      style={{
                        backgroundImage: `url(${product.item.avatar.secure_url})`,
                      }}
                    />
                    <CardBody>
                      <h4 className="product-title">
                        {product.item.title}
                        <span> ({product.item.category}) </span>
                      </h4>
                      <p className="total-discount">
                        ${product.item.sellingPrice}.00
                      </p>
                      <p className="total-price">${product.item.price}.00</p>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </div>

      <Modal
        title="Reason for flagging this program"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <textarea
          className="w-100 px-2"
          rows="5"
          value={flagMessage}
          onChange={(e) => setFlagMessage(e.target.value)}
        ></textarea>

        <Button
          disabled={flagMessage === ""}
          type="primary"
          className="mt-4"
          onClick={() => flagProgram()}
        >
          {addFlagState.isLoading ? (
            <LoadingOutlined style={{ fontSize: 20, color: "#000000" }} spin />
          ) : (
            <span>Report</span>
          )}
        </Button>
      </Modal>

      <Modal
        title="Terms of use"
        visible={isTermsModalVisible}
        onOk={handleTermsOk}
        onCancel={handleTermsCancel}
        footer={null}
      >
        <p>
          Terms and Conditions General Site Usage Last Revised: December 16,
          2013 Welcome to www.lorem-ipsum.info. This site is provided as a
          service to our visitors and may be used for informational purposes
          only. Because the Terms and Conditions contain legal obligations,
          please read them carefully. 1. YOUR AGREEMENT By using this Site, you
          agree to be bound by, and to comply with, these Terms and Conditions.
          If you do not agree to these Terms and Conditions, please do not use
          this site. PLEASE NOTE: We reserve the right, at our sole discretion,
          to change, modify or otherwise alter these Terms and Conditions at any
          time.
        </p>
        <form onSubmit={openPaypal}>
          <div className="mt-3 d-flex align-items-center gap-2">
            <input type="checkbox" required />
            <label>I have read and agreed to terms of use</label>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              // onClick={() => }
              className="btn btn-success mt-4"
            >
              Proceed
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProgramDetails;
