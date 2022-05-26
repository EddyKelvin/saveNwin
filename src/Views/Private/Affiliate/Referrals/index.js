import "./index.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import {
  getClickedReferral,
  clickedReferralCleanup,
} from "../../../../Store/actions/clickedReferral";

function Referrals() {
  const dispatch = useDispatch();

  const clickedReferralState = useSelector((state) => state.clickedReferral);
  const userState = useSelector((state) => state.getMe);

  const [clickedReferralTotal, setClickedReferralTotal] = useState("");

  useEffect(() => {
    dispatch(getClickedReferral());
  }, []);

  useEffect(() => {
    if (clickedReferralState.isSuccessful) {
      setClickedReferralTotal(clickedReferralState.data);
      dispatch(clickedReferralCleanup());
    } else if (clickedReferralState.error) {
      dispatch(clickedReferralCleanup());
    }
  }, [clickedReferralState]);

  return (
    <div className="referral-container">
      <h1>Referrals</h1>
      <hr />
      <p className="mt-0 pt-0 font-weight-bold">
        Total clicked referrals : {clickedReferralTotal.length}
      </p>

      {clickedReferralState.isLoading ? (
        <div className="text-center py-5">
          <LoadingOutlined style={{ fontSize: 30 }} spin />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table borderless">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Confirmed</th>
                <th scope="col">Earned Discount</th>
                <th scope="col">Date</th>
              </tr>
            </thead>

            {clickedReferralTotal.length === 0 ? (
              <tbody className="text-bold">
                <tr>
                  <td>You have no referrals yet</td>
                </tr>
              </tbody>
            ) : (
              clickedReferralTotal.map((item, index) => (
                <tbody key={index}>
                  <tr className="all-products">
                    <td>{index + 1}.</td>

                    <td>{item.email}</td>

                    <td>{item.role}</td>

                    <td>{item.confirmed == true ? "true" : "false"}</td>

                    <td>${item.earnedDiscount}</td>

                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              ))
            )}
          </table>
        </div>
      )}
    </div>
  );
}

export default Referrals;
