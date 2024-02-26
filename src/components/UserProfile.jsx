import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/actions/profileactions";
import { Card, Spinner, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UserFavorites from "./UserFavorites"; // Importa il componente UserFavorites

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
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col className="col-11 col-sm-9 col-md-8 col-lg-6">
          {userProfile && (
            <Card className="bg-info-subtle text-primary border-success border-4 shadow-lg p-4">
              <Row>
                <Col className="col-12">
                  <Card.Img
                    src={userProfile.avatar}
                    className="rounded-circle border border-4 border-success w-50"
                  />
                </Col>
              </Row>
              <Card.Text> {userProfile.name}</Card.Text>
              <Card.Text> {userProfile.surname}</Card.Text>
            </Card>
          )}
          <UserFavorites />
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
