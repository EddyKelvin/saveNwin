import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import { Modal, Button } from "antd";
import {
  deleteAccount,
  deleteAccountCleanup,
} from "../../../Store/actions/deleteAccount";

function DeleteAccount() {
  const dispatch = useDispatch();
  const history = useHistory();
  const deleteState = useSelector((state) => state.deleteAccount);

  const [msg, setMsg] = useState("");

  // FOR MODAL
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

  const deleteUser = () => {
    dispatch(deleteAccount());
  };

  useEffect(() => {
    if (deleteState.isSuccessful) {
      history.push("/");
      dispatch(deleteAccountCleanup());
    } else if (deleteState.error) {
      setMsg(deleteState.error);
      dispatch(deleteAccountCleanup());
    }
  }, [deleteState]);

  return (
    <div className="editProfileWrapper mb-5">
      <div className="editProfileInner">
        <h4 style={{ color: "#ab0303", fontWeight: "600" }}>Delete Account</h4>

        <p className="text-danger">
          Once you delete your account, there is no going back, be certain.
        </p>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <button style={btnStyle} onClick={showModal}>
            Delete Account
          </button>
        </div>
      </div>

      <Modal
        title="Delete Account"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p className="text-center">
          Are you sure you want to delete your account?
        </p>

        <div className="d-flex justify-content-around mt-5">
          <Button type="primary" danger>
            CANCEL
          </Button>

          <Button onClick={() => deleteUser()} type="primary">
            {deleteState.isLoading ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <span>PROCEED</span>
            )}
          </Button>
        </div>

        <p>{msg}</p>
      </Modal>
    </div>
  );
}

export default DeleteAccount;

const btnStyle = {
  width: "130px",
  height: "35px",
  marginTop: "20px",
  marginBottom: "20px",
  backgroundColor: "#dbd9d9",
  borderRadius: "8px",
  color: "#ab0303",
  border: "1px solid #ab0303",
};

const delBtnStyle = {
  width: "100%",
  height: "35px",
  marginTop: "20px",
  marginBottom: "10px",
  backgroundColor: "#dbd9d9",
  borderRadius: "8px",
  color: "#ab0303",
  border: "1px solid #ab0303",
};
