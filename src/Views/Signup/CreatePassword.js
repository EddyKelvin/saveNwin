import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

//actions
import { setPassword, setStage } from "../../Store/actions/signupProgress";
import { signup } from "../../Store/actions/signup";

const CreatePassword = () => {
  const dispatch = useDispatch();
  const progress = useSelector((s) => s.signupProgress);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const referralCode = searchParams.get("referral-code");

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

  const onFinish = (values) => {
    dispatch(
      setPassword({
        ...values,
      })
    );
    dispatch(
      signup({
        ...progress,
        ...values,
        referralCode,
      })
    );
  };

  // useEffect(() => {
  //     dispatch(signup(progress))
  // }, [progress])

  const onClick = () => {
    dispatch(
      setStage({
        stage: "profile",
      })
    );
  };

  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        name="login"
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className="mt-3 d-flex align-items-center gap-2">
          <input type="checkbox" required />
          <label>
            I have read and agreed to{" "}
            <span className="terms-btn" onClick={showModal}>
              terms of use
            </span>
          </label>
        </div>

        <Form.Item>
          <Button onClick={onClick} className="back">
            Back
          </Button>
          <Button htmlType="submit" className="signup-btn">
            Sign up
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Terms of use"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
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
      </Modal>
    </>
  );
};

export default CreatePassword;
