import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/reducers/authslice";
import { fetchProfile } from "../redux/actions/profileactions";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileDetail = useSelector((state) => state.personalProfile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div>
      {profileDetail && profileDetail.loading && <p>Loading...</p>}
      {profileDetail && profileDetail.profile && (
        <div>
          <h2>User Profile</h2>
          <p>Name: {profileDetail.profile.name}</p>
          <p>Email: {profileDetail.profile.email}</p>
          {/* Add other profile information here */}
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
      {profileDetail && profileDetail.error && (
        <p>Error: {profileDetail.error}</p>
      )}
    </div>
  );
};

export default ProfileComponent;
