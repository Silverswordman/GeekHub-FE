import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Card,
  Col,
  Row,
  Spinner,
  Badge,
} from "react-bootstrap";

import { BsPencilFill } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/reducers/authslice";
import {
  fetchProfile,
  uploadProfilePicture,
} from "../redux/actions/profileactions";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileDetail = useSelector((state) => state.personalProfile);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      await dispatch(uploadProfilePicture(file));
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center ">
        <Col className=" col-11 col-md-7 col-lg-6">
          <Card className="bg-info-subtle border-primary-subtle border-4 shadow-lg">
            {profileDetail && profileDetail.loading && (
              <Spinner animation="grow" className="text-primary" size="sm" />
            )}
            {profileDetail && profileDetail.profile && (
              <Card.Body>
                <Card.Text className="fw-bolder fs-3 fst-italic text-center text-primary">
                  Benvenuto! {profileDetail.profile.username}
                </Card.Text>
                <Row className="justify-content-center ">
                  <Card.Img
                    as="label"
                    htmlFor="fileInput"
                    className="fluid w-50 my-1 position-relative "
                    style={{ cursor: "pointer" }}
                  >
                    <Badge
                      pill
                      bg="primary"
                      className="position-absolute top-100 start-50 translate-middle badge bg-primary"
                      style={{
                        width: "30px",
                        height: "25px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    >
                      <BsPencilFill />
                    </Badge>
                    {profileDetail.loading ? (
                      <Spinner
                        animation="grow"
                        className="text-primary"
                        size="sm"
                      />
                    ) : (
                      <>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          className="d-none"
                          onChange={handleFileChange}
                        />
                        <img
                          src={profileDetail.profile.avatar}
                          alt="Avatar"
                          className="w-100 h-100 rounded-circle border border-5 border-primary"
                        />
                      </>
                    )}
                  </Card.Img>
                </Row>
                <Row>
                  <Col className="text-end me-5">
                    <Button
                      className="btn-sm bg-primary text-primary-subtle  "
                      onClick={handleUpload}
                      disabled={!file || uploading}
                    >
                      {uploading ? "Uploading..." : "Save Avatar"}
                    </Button>
                  </Col>
                </Row>

                <Row className="align-items-baseline">
                  <Col className="col-5">
                    <Card.Text className="fs-5">
                      {profileDetail.profile.name}{" "}
                      {profileDetail.profile.surname}
                    </Card.Text>
                  </Col>
                  <Col className="col-5 text-end">
                    <Card.Text> {profileDetail.profile.role}</Card.Text>
                  </Col>
                </Row>

                <Card.Text className="fs-5">
                  {profileDetail.profile.email}
                </Card.Text>

                {/* <InputGroup className="mb-3">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </InputGroup> */}

                <Button
                  onClick={handleLogout}
                  className="text-primary fw-semibold btn-danger"
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
