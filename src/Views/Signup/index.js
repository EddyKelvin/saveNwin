/* eslint-disable react-hooks/exhaustive-deps */
//styles
import "./index.css";

//modules and packages
import React, { useEffect, useState } from "react";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//media
import confetti from "../../Assets/images/confetti.png";

//components
import AccountType from "./AccountType";
import PersonalDetails from "./PersonalDetails";
import CreatePassword from "./CreatePassword";

//actions
import { signupCleanup } from "../../Store/actions/signup";
import { cleanup } from "../../Store/actions/signupProgress";
import AuthHeader from "../../Components/AuthHeader";

const Signup = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { stage } = useSelector((s) => s.signupProgress);
  const signupState = useSelector((s) => s.signup);

  useEffect(() => {
    if (signupState.isSuccessful) {
      dispatch(signupCleanup());
      setSuccess(true);
    } else if (signupState.error) {
      setError(signupState.error);
      dispatch(signupCleanup());
      dispatch(cleanup());
    }
  }, [signupState]);

  return (
    <div className="signup">
      <AuthHeader />
      <Container>
        <div className="header">
          <ul className="progressive">
            <li
              className={`progress-items ${
                stage === "account" ||
                stage === "profile" ||
                stage === "password"
                  ? "active"
                  : ""
              }`}
            >
              <UserOutlined /> Select user type
            </li>
            <li
              className={`progress-items ${
                stage === "profile" || stage === "password" ? "active" : ""
              }`}
            >
              {" "}
              ---- <UserOutlined /> Personal details
            </li>
            <li
              className={`progress-items ${
                stage === "password" ? "active" : ""
              }`}
            >
              {" "}
              ---- <KeyOutlined /> Create password
            </li>
          </ul>
        </div>
        <div className="form-div">
          {!success && (
            <>
              <h3>Sign up</h3>
              <p>Shop, save and support your local community</p>
              <p>One account allowed per email</p>
              {error ? (
                <Alert message={error} type="error" showIcon closable />
              ) : null}
              <br />
              {stage === "account" && <AccountType />}
              {stage === "profile" && <PersonalDetails />}
              {stage === "password" && <CreatePassword />}
            </>
          )}
          {success && (
            <>
              <div>
                <img src={confetti} alt="well done" />
                <p>You have successfully signed up to Save'N'Win</p>
                <p>kindly check your mail to activate your accout</p>
              </div>
            </>
          )}
        </div>
      </Container>
      <p style={{ marginTop: 20 }}>
        have an accout? <Link to="/login">login here</Link>{" "}
      </p>
    </div>
  );
};

export default Signup;
