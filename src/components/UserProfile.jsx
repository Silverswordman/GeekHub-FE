import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/actions/profileactions";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams(); 
  const { userProfile, loadingProfile, errorProfile } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  if (loadingProfile) {
    return <Spinner animation="grow" variant="info" />;
  }

  if (errorProfile) {
    return <p>Error: {errorProfile}</p>;
  }

  return (
    <>
      {userProfile && (
        <Card className="bg-info-subtle text-primary border-success border-4 shadow-lg p-4">
          <Card.Img
            src={userProfile.avatar}
            className="w-25 rounded-pill border border-4 border-primary"
          />
          <Card.Text>Name: {userProfile.name}</Card.Text>
          <Card.Text>Surname: {userProfile.surname}</Card.Text>
        </Card>
      )}
    </>
  );
};

export default UserProfile;
