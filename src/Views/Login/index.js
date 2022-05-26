/* eslint-disable react-hooks/exhaustive-deps */
//styles
import "./index.css";

//modules and packages
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

//actions
import { login, loginCleanup } from "../../Store/actions/login";
import { addManyCart } from "../../Store/actions/addManyCarts";
import { clearAuth } from "../../Store/actions/auth";

//components
import AuthHeader from "../../Components/AuthHeader";

const Login = () => {
  const [error, setError] = useState(null);
  const [activate, setActivate] = useState(false);
  const dispatch = useDispatch();
  const loginState = useSelector((s) => s.login);
  const history = useHistory();

  const onFinish = (values) => {
    if (error) setError(null);
    dispatch(login(values));
  };

  useEffect(() => {
    if (loginState.isSuccessful) {
      if (loginState.data.role === "customer") {
        const cart = JSON.parse(localStorage.getItem("cart"));
        dispatch(addManyCart(cart));
      }
      dispatch(loginCleanup());
      history.push("/");
    } else if (loginState.error) {
      if (loginState.error === "please activate your account") {
        setActivate(true);
        setTimeout(() => {
          return history.push("/");
        }, 5000);
      }
      setError(loginState.error);
      dispatch(loginCleanup());
      dispatch(clearAuth());
    }
  }, [loginState]);

  return (
    <div className="login">
      <AuthHeader />
      <Container>
        <div className="form-div">
          {activate && (
            <>
              <p>Please check your mailbox to activate you Accout</p>
            </>
          )}
          {!activate && (
            <>
              <h3>Log in</h3>
              <p>Shop, save and support your local community</p>
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
                <Form.Item
                  className="login_password"
                  labelAlign="left"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password",
                    },
                    {
                      min: 8,
                      message: "minimum of 8 characters",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Link to="/password-reset" className="forgot">
                  forgot password?
                </Link>
                <Form.Item>
                  <Button htmlType="submit" className="login-btn">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </div>
        <p style={{ marginTop: 20 }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </Container>
    </div>
  );
};

export default Login;
