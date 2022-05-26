//styles
import "./index.css";

//modules and packages
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { Container } from "reactstrap";

//components
import AuthHeader from "../../Components/AuthHeader";
import { useDispatch, useSelector } from "react-redux";

//actions
import {
  forgotPassCleanup,
  forgotPass,
} from "../../Store/actions/forgotPassword";

//media
import confetti from "../../Assets/images/confetti.png";

const ForgotPass = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const forgotPassState = useSelector((s) => s.forgotPass);

  useEffect(() => {
    if (forgotPassState.isSuccessful) {
      setSuccess(true);
      dispatch(forgotPassCleanup());
    } else if (forgotPassState.error) {
      setError(forgotPassState.error);
      dispatch(forgotPassCleanup());
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [forgotPassState]);

  const onFinish = (values) => {
    if (error) setError(null);
    dispatch(forgotPass(values));
  };

  return (
    <div className="password-reset">
      <AuthHeader />
      <Container className="form-container">
        {!success && (
          <>
            <h2>Forgot password</h2>
            <p>
              kindly input your email address and we will send you a reset
              password link
            </p>
            {error ? (
              <Alert message={error} type="error" showIcon closable />
            ) : null}
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="login"
              onFinish={onFinish}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "please input an email",
                  },
                  {
                    type: "email",
                    message: "Enter a valid email",
                  },
                ]}
                labelAlign="left"
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" className="login-btn">
                  Send reset link
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        {success && (
          <>
            <img src={confetti} alt="well done!" />
            <p>Check your email to continue the password reset</p>
          </>
        )}
      </Container>
    </div>
  );
};

export default ForgotPass;
