//styles
import "./index.css";

//modules and packages
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

//media
import check from "../../Assets/images/check.png";

//actions
import { passResetCleanup, passReset } from "../../Store/actions/PasswordReset";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const passResetState = useSelector((s) => s.passReset);

  useEffect(() => {
    if (passResetState.isSuccessful) {
      setSuccess(true);
      dispatch(passResetCleanup());
    } else if (passResetState.error) {
      setError(passResetState.error);
      dispatch(passResetCleanup());
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [passResetState]);

  const onFinish = (values) => {
    if (error) setError(null);
    dispatch(passReset(values, token));
  };

  return (
    <div className="password-reset">
      <Container className="form-container">
        {success && (
          <div>
            <img src={check} alt="well done!" />
            <p>you have successfully reset your password</p>
            <p>
              Go to <Link to="/login">Login</Link>
            </p>
          </div>
        )}
        {!success && (
          <>
            <h2>Password Reset</h2>
            <p>kindly input a new password</p>
            {error ? (
              <Alert message={error} type="error" showIcon closable />
            ) : null}
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="reset-password"
              onFinish={onFinish}
            >
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "please input you password",
                  },
                  {
                    min: 8,
                    message: "password should be minimum of 8 characters",
                  },
                ]}
                labelAlign="left"
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" className="login-btn">
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </div>
  );
};

export default PasswordReset;
