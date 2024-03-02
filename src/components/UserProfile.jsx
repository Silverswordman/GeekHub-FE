import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/actions/profileactions";
import { Card, Spinner, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UserFavorites from "./UserFavorites"; 


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
    <Container className="my-4 fadefromleft">
      <Row className="justify-content-center">
        <Col className="col-11 col-sm-10 col-md-9 col-lg-6">
          {userProfile && (
            <Card className="bg-transparent bg-gradient text-white border-info border-4 shadow-lg p-4">
              <Row className="mb-3 align-items-center justify-content-center justify-content-md-start">
                <Col className="col-9 col-md-4">
                <Card.Img
                  src={userProfile.avatar}
                  className="rounded-circle border border-4 border-success-subtle w-100 hover-scale"
                />
                </Col>
                <Col className="col-7 text-start ">
                <Card.Title className="fs-1 fst-italic"> {userProfile.username}</Card.Title>
                </Col>
              </Row>
              <Card.Text className="fs-5"> {userProfile.name} {userProfile.surname}</Card.Text>
            </Card>
          )}
        </Col>
      </Row>
      <UserFavorites></UserFavorites>
    </Container>
  );
};

export default UserProfile;
