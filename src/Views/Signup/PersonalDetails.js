import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";

//actions
import { setProfile, setStage } from "../../Store/actions/signupProgress";

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const getRole = useSelector((state) => state.signupProgress);
  const [isMinority, setIsMinority] = useState(false);

  const onFinish = (values) => {
    const { email, phoneNo } = values;
    dispatch(
      setProfile({
        email,
        phoneNo,
        minority: isMinority,
      })
    );
  };

  const onClick = () => {
    dispatch(
      setStage({
        stage: "account",
      })
    );
  };

  function onChange(e) {
    setIsMinority(!isMinority);
  }

  return (
    <>
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
          labelAlign="left"
          label="Phone Number"
          name="phoneNo"
          rules={[
            {
              required: true,
              message: "Please input your phone number",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {getRole.role === "business" && (
          <Checkbox onChange={onChange}>Minority</Checkbox>
        )}

        <Form.Item>
          <Button onClick={onClick} className="back">
            Back
          </Button>
          <Button htmlType="submit" className="signup-btn">
            Continue
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PersonalDetails;
