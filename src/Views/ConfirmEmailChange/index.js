// eslint-disable-line react-hooks/exhaustive-deps
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  confirmEmail,
  confirmEmailCleanup,
} from "../../Store/actions/confirmEmail";

const ConfirmEmailChange = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const confirmEmailState = useSelector((state) => state.confirmEmail);

  const confirmUserMail = () => {
    dispatch(confirmEmail(token));
  };

  useEffect(() => {
    if (confirmEmailState.isSuccessful) {
      dispatch(confirmEmailCleanup());
    } else if (confirmEmailState.error) {
      dispatch(confirmEmailCleanup());
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [confirmEmailState]);

  return (
    <div className="container p-5">
      <div className="d-flex flex-column align-items-center">
        <h3>Confirm email change</h3>

        <p>Kindly click on the button to confirm email change</p>

        <div>
          <button onClick={confirmUserMail} style={btnStyle}>
            Change Email
          </button>
        </div>
      </div>
    </div>
  );
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

export default ConfirmEmailChange;
