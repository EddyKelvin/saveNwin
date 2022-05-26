import "./profile.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeEmail,
  changeEmailCleanup,
} from "../../../Store/actions/changeEmail.js/index.js";

function EditProfile() {
  const dispatch = useDispatch();
  const changeEmailState = useSelector((state) => state.changeEmail);

  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [msg, setMsg] = useState("");

  const submitEmail = (e) => {
    e.preventDefault();

    const data = { newEmail };

    dispatch(changeEmail(data));

    setOldEmail("");
    setNewEmail("");
  };

  useEffect(() => {
    if (changeEmailState.isSuccessful) {
      setMsg("Check your email to continue");
      dispatch(changeEmailCleanup());
    } else if (changeEmailState.error) {
      setMsg("An error occured. try again");
      dispatch(changeEmailCleanup());
    }
  }, [changeEmailState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="editProfileWrapper">
      <form
        onSubmit={submitEmail}
        className="editProfileInner"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
      >
        <h4>Change Email</h4>

        <div className="mb-3 mt-4">
          <label style={labelStyle}>Old Email</label>
          <input
            style={styles}
            type="email"
            value={oldEmail}
            onChange={(e) => setOldEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>New Email</label>
          <input
            style={styles}
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <p>{msg}</p>
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
            Change Email
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
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

export default EditProfile;
