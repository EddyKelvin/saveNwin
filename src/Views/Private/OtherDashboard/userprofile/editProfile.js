/* eslint-disable react-hooks/exhaustive-deps */
//styles
import "./profile.css";

//packages
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Select, Alert } from "antd";

import america from "../../../../Utils/location/america";

import {
  updateProfile,
  updateProfileCleanup,
} from "../../../../Store/actions/updateProfile";
import { getMe } from "../../../../Store/actions/getMe";

function EditProfile(props) {
  const updateProfileState = useSelector((s) => s.updateProfile);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { role, name, businessName, businessType, address, city, state } =
    props.user;
  const { Option } = Select;
  const [cities, setCities] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const states = Object.keys(america);

  useEffect(() => {
    if (updateProfileState.isSuccessful) {
      dispatch(getMe());
      dispatch(updateProfileCleanup());
    } else if (updateProfileState.error) {
      setError(updateProfileState.error);
      dispatch(updateProfileCleanup());
    }
  }, [updateProfileState]);

  const onFinish = (values) => {
    dispatch(updateProfile(values));
    setDisabled(!disabled);
  };

  const onChangeState = (state) => {
    setCities(america[state]);
  };

  return (
    <div className="editProfileWrapper">
      <div
        className="editProfileInner"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
      >
        <div className="mb-3">
          {disabled && (
            <Button onClick={() => setDisabled(!disabled)}>Edit Profile</Button>
          )}
        </div>
        <div className="editProfileInput">
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="login"
            onFinish={onFinish}
          >
            {error && <Alert message={error} type="error" showIcon closable />}
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "please input your name",
                },
                {
                  type: "string",
                },
                {
                  min: 4,
                  message: "name shoud be more than 4 characters long",
                },
              ]}
              labelAlign="left"
            >
              <Input disabled={disabled} placeholder={name ? name : ""} />
            </Form.Item>
            {role === "business" && (
              <>
                <Form.Item
                  label="Business Name"
                  name="businessName"
                  rules={[
                    {
                      required: true,
                      message: "please input your name",
                    },
                    {
                      type: "string",
                    },
                  ]}
                  labelAlign="left"
                >
                  <Input
                    disabled={disabled}
                    placeholder={
                      businessName ? businessName : "Enter Business Name"
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Business Type"
                  name="businessType"
                  rules={[
                    {
                      required: true,
                      message: "please input your name",
                    },
                    {
                      type: "string",
                    },
                  ]}
                  labelAlign="left"
                >
                  <Input
                    disabled={disabled}
                    placeholder={
                      businessType ? businessType : "Enter Business Type"
                    }
                  />
                </Form.Item>
              </>
            )}
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  type: "string",
                },
              ]}
              labelAlign="left"
            >
              <Input
                disabled={disabled}
                placeholder={address ? address : "Enter Address"}
              />
            </Form.Item>
            <Form.Item label="State" name="state" labelAlign="left">
              <Select
                disabled={disabled}
                placeholder={state ? state : "Select State"}
                onChange={onChangeState}
              >
                {states.map((state, index) => (
                  <Option value={state} key={index}>
                    {state}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="City" name="city" labelAlign="left">
              <Select
                disabled={disabled}
                placeholder={city ? city : "Select City"}
              >
                {cities.map((city, index) => (
                  <Option value={city} key={index}>
                    {city}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {!disabled && (
              <Form.Item>
                <Button htmlType="submit">Submit</Button>
                <Button onClick={() => setDisabled(!disabled)}>Cancel</Button>
              </Form.Item>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
