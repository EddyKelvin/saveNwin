import "./profile.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import AxiosCall from "../../../../Utils/axios";
import ErrorHandler from "../../../../Utils/error-handler";
import { UserOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { getMe } from "../../../../Store/actions/getMe";

function UserProfile(props) {
  const { user } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const doNothing = async ({ file, onSuccess }) => {
    const formData = new FormData();
    formData.append("profile-pic", file);
    try {
      const requestObj = {
        path: "users/profile-pic",
        method: "PUT",
        data: formData,
        contentType: "multipart/form-data",
      };
      const { data } = await AxiosCall(requestObj);
      message.success(data.message);
      setLoading(false);
      dispatch(getMe());
      onSuccess("ok");
    } catch (err) {
      const error = ErrorHandler(err);
      message.error(error);
      onSuccess("ok");
    }
  };

  const beforeUpload = async (file) => {
    setLoading(true);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <div className="account-wrapper">
      <div className="account-Container">
        <div
          style={{
            position: "relative",
            padding: "10px 0px",
          }}
        >
          <Upload
            name="profile-pic"
            customRequest={doNothing}
            maxCount={1}
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {user.avatar && user.avatar.secure_url ? (
              <img src={user.avatar.secure_url} alt="logo" />
            ) : (
              <UserOutlined style={{ fontSize: "30px" }} />
            )}

            <br />

            {loading ? (
              <LoadingOutlined
                style={{
                  height: 24,
                  width: 24,
                  backgroundColor: "#d4d4d4",
                  padding: 5,
                  borderRadius: "50%",
                }}
              />
            ) : (
              <>
                {user.avatar && user.avatar.secure_url ? (
                  <EditOutlined
                    style={{
                      position: "absolute",
                      top: 70,
                      height: 24,
                      width: 24,
                      right: -25,
                      backgroundColor: "#d4d4d4",
                      padding: 5,
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <EditOutlined
                    style={{
                      position: "absolute",
                      top: 20,
                      height: 24,
                      width: 24,
                      right: -30,
                      backgroundColor: "#d4d4d4",
                      padding: 5,
                      borderRadius: "50%",
                    }}
                  />
                )}
              </>
            )}
          </Upload>
        </div>

        <div className="account-details">
          <h4>{user.name}</h4>

          <span>{user.email}</span>

          <span>User ID: {user._id}</span>
        </div>

        <div className="user-rating">
          <div className="row">
            <span className="text-center">
              ${user.earnedDiscont ? user.earnedDiscont : 0}
            </span>

            <span className="text-center">Saved</span>
          </div>

          <div className="row">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                fontWeight: "500",
                textTransform: "capitalize",
              }}
            >
              <span>{user.role}</span>
            </div>

            <span>Account Type</span>
          </div>

          {user.role == "affiliate" ? (
            <div className="row">
              <span className="text-center">${user.referralEarned}</span>
              <span className="text-center">Referral Earned</span>
            </div>
          ) : null}
        </div>

        {user.role === "affiliate" ? (
          <div className="btnWrapper text-center mb-3">
            <span className="fw-bold">Referral Link</span>
            <br />

            {user.affiliateLink ? (
              <span style={{ fontSize: "11px" }}>
                https://staging-save-n-win.herokuapp.com/signup?referral-code=
                {user.affiliateLink}
              </span>
            ) : (
              <span>Not available</span>
            )}

            <CopyToClipboard
              text={`https://staging-save-n-win.herokuapp.com/signup?referral-code=${
                user.affiliateLink ? user.affiliateLink : null
              }`}
              onCopy={() => message.success("copied")}
            >
              {user.affiliateLink ? (
                <button style={{ fontSize: "10px" }} className="copy-btn">
                  Copy
                </button>
              ) : null}
            </CopyToClipboard>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default UserProfile;
