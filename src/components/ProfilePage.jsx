import { useEffect } from "react";
import { Button, Container, Card, Col, Row, Spinner } from "react-bootstrap";
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
    <Container className="my-4">
      <Row className="justify-content-center ">
        <Col className=" col-10 col-md-7 col-lg-6">
          <Card className="bg-info-subtle">
            {profileDetail && profileDetail.loading && (
              <Spinner animation="grow" className="text-primary" size="sm" />
            )}
            {profileDetail && profileDetail.profile && (
              <Card.Body>
                <Card.Text className="fw-bold fs-4 fst-italic text-center">
                  Benvenuto! {profileDetail.profile.username}
                </Card.Text>
                <Card.Img
                  src={profileDetail.profile.avatar}
                  className="fluid w-50 my-1"
                ></Card.Img>
                <Row className="align-items-baseline">
                  <Col className="col-5">
                    <Card.Text className="fs-5">
                      {" "}
                      {profileDetail.profile.name}{" "}
                      {profileDetail.profile.surname}
                    </Card.Text>
                  </Col>
                  <Col className="col-5 text-end">
                    <Card.Text> {profileDetail.profile.role}</Card.Text>
                  </Col>
                </Row>

                <Card.Text className="fs-5">
                  {" "}
                  {profileDetail.profile.email}
                </Card.Text>

                <Button
                  onClick={handleLogout}
                  className="text-primary fw-semibold  btn-danger"
                >
                  Logout
                </Button>
              </Card.Body>
            )}
            {profileDetail && profileDetail.error && (
              <p>Error: {profileDetail.error}</p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileComponent;
