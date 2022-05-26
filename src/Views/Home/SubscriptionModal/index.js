//styles
import "./index.css";

import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

//media
import emailMarketing from "../../../Assets/images/email-marketing.png";
import special from "../../../Assets/images/Group.png";
import confetti from "../../../Assets/images/confetti.png";

//actions
import { subCleanup } from "../../../Store/actions/subscription";
import { Alert } from "antd";

const SubscriptionModal = (props) => {
  const { toggle, modal, subscribe } = props;
  const dispatch = useDispatch();
  const subState = useSelector((state) => state.sub);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (subState.isSuccessful) {
      setSuccess(subState.isSuccessful);
      setTimeout(() => {
        toggle();
      }, 5000);
      dispatch(subCleanup);
    } else if (subState.error) {
      setError(subState.error);
      dispatch(subCleanup);
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [subState]);

  return (
    <Modal isOpen={modal} toggle={toggle} className="email-popup">
      <CloseOutlined onClick={toggle} className="close-btn" />
      {!success && (
        <>
          <div className="img-container">
            <img src={special} alt="special" className="special" />
            <img src={emailMarketing} alt="email" />
          </div>
          <h2>New VIP offers Early Bird notification!</h2>
          <p>
            Subscribe to the SaveNWin VIP mailing list to be notified of new VIP
            offers before they are sold out
          </p>
          {error ? (
            <Alert message={error} type="error" showIcon closable />
          ) : null}
          <form
            className="modal-sub-form"
            onSubmit={(e) => {
              e.preventDefault();
              subscribe({ email });
            }}
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
            />
            <button type="submit">Subscribe</button>
          </form>
        </>
      )}
      {success && (
        <>
          <img src={confetti} alt="well done!" />
          <h1>Well Done!</h1>
          <p>You have successfully subscribed to our newslette</p>
        </>
      )}
    </Modal>
  );
};

export default SubscriptionModal;
