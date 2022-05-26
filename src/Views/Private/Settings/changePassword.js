import "./profile.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePass,
  changePassCleanup,
} from "../../../Store/actions/changePassword";

function EditPassword() {
  const dispatch = useDispatch();
  const changePassState = useSelector((state) => state.changePass);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatNewPass, setRepeatNewPass] = useState("");
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submitPass = (e) => {
    e.preventDefault();

    const data = {
      password: oldPass,
      newPassword: newPass,
    };

    if (newPass !== repeatNewPass) {
      setErrorMsg("Passwords do not match");
    } else {
      dispatch(changePass(data));

      setOldPass("");
      setNewPass("");
      setRepeatNewPass("");
    }
  };

  useEffect(() => {
    if (changePassState.isSuccessful) {
      setMsg("Password changed successfully");
      dispatch(changePassCleanup());
    } else if (changePassState.error) {
      setMsg("An error occured. Try again");
      dispatch(changePassCleanup());
    }
  }, [changePassState]);

  return (
    <div className="editProfileWrapper">
      <form
        onSubmit={submitPass}
        className="editProfileInner"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
      >
        <h4>Change Password</h4>

        <div className="mb-3 mt-4">
          <label style={labelStyle}>Old Password</label>
          <input
            style={inputStyles}
            type="password"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 mt-4">
          <label style={labelStyle}>New Password</label>
          <input
            style={inputStyles}
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Repeat New Password</label>
          <input
            style={inputStyles}
            type="password"
            value={repeatNewPass}
            onChange={(e) => setRepeatNewPass(e.target.value)}
            required
          />
        </div>

        <div>
          <p className="text-success">{msg}</p>
          <p className="text-danger">{errorMsg}</p>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <button style={btnStyle} type="submit">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyles = {
  backgroundColor: "#f3f3f3",
  width: "100%",
  borderRadius: "5px",
  height: "40px",
  border: "1px solid rgba(0,0,0,0.1)",
  padding: "0px 5px",
};

const btnStyle = {
  width: "130px",
  height: "35px",
  marginTop: "20px",
  marginBottom: "20px",
  backgroundColor: "#ff4c4f",
  borderRadius: "8px",
  color: "#ffffff",
  border: "none",
};

const labelStyle = {
  fontWeight: "bolder",
  fontSize: "14px",
  color: "rgba(0,0,0,0.5)",
  marginBottom: "15px",
};

export default EditPassword;
