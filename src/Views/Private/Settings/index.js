import EditPassword from "./changePassword";
import DeleteAccount from "./deleteAccount";
import EditProfile from "./editProfle";

const Settings = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6">
          <EditProfile />
          <EditPassword />
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default Settings;
