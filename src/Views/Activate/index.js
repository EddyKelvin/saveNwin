//styles
import "./index.css";

//modules and packages
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MehOutlined, LoadingOutlined } from "@ant-design/icons";

//actions
import { activate, activateCleanup } from "../../Store/actions/activate";

//media
import confetti from "../../Assets/images/confetti.png";

const Activate = () => {
  const { token } = useParams();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const activateState = useSelector((s) => s.activate);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) setError(null);
    dispatch(activate(token));
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activateState.isLoading) {
      setLoading(activateState.isLoading);
      dispatch(activateCleanup());
    } else if (activateState.isSuccessful) {
      setSuccess(activateState.isSuccessful);
      setLoading(false);
      dispatch(activateCleanup());
    } else if (activateState.error) {
      setLoading(false);
      setError(activateState.error);
      dispatch(activateCleanup());
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [activateState]);

  return (
    <div className="activate">
      {loading && (
        <>
          <LoadingOutlined spin />
        </>
      )}
      {success && (
        <>
          <img src={confetti} alt="well done!" />
          <p>Yaaay!!!</p>
          <p>your account has successfully being activated</p>
          <p>
            please login <Link to="/login">here</Link>
          </p>
        </>
      )}
      {error && (
        <>
          <MehOutlined />
          <p>{error}</p>
        </>
      )}
    </div>
  );
};

export default Activate;
