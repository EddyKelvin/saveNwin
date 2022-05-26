import "./profile.css";
import Button from "../../../../Components/customButton/button";
import Input from "../../../../Components/input/index";
import { useState } from "react";

function EditPassword() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });
    if (value !== "") {
      setErrors((prev) => {
        return {
          ...prev,
          [name]: null,
        };
      });
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          [name]: "this field is required",
        };
      });
    }
  };

  const onSubmit = () => {
    if (!form.password) {
      setErrors((prev) => {
        return {
          ...prev,
          password: "password can not be empty",
        };
      });
    }
    if (!form.confirm_password) {
      setErrors((prev) => {
        return {
          ...prev,
          confirm_password: "field can not be empty",
        };
      });
    }
    if (
      form.password !== "undefined" &&
      form.confirm_password !== "undefined"
    ) {
      if (form.password !== form.confirm_password) {
        setErrors((prev) => {
          return {
            ...prev,
            confirm_password: "passwords must much",
          };
        });
      }
    }
  };
  return (
    <div className="editProfileWrapper">
      <div className="editProfileInner">
        <h6>Change Password</h6>
        <div className="editProfileInput">
          <Input
            bg="#F3F3F3"
            height={40}
            br={5}
            ml={20}
            pl={10}
            type="password"
            error={errors.password}
            onChange={(e) => {
              onChange({ name: "password", value: e.target.value });
            }}
            title="Current Password"
          />
          <Input
            bg="#F3F3F3"
            type="confirm_password"
            error={errors.confirm_password}
            onChange={(e) => {
              onChange({ name: "confirm_password", value: e.target.value });
            }}
            height={40}
            br={5}
            ml={20}
            pl={10}
            title="New Password"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              height={33}
              onclick={onSubmit}
              title="Save Changes"
              color="#fff"
              mt={20}
              mb={20}
              br={8}
              bg="#FF4C4F"
              width={130}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPassword;
