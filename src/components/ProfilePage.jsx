import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Card,
  Col,
  Row,
  Spinner,
  Badge,
  Alert,
} from "react-bootstrap";
import { BsPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../redux/reducers/authslice";
import {
  fetchProfile,
  uploadProfilePicture,
} from "../redux/actions/profileactions";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileDetail = useSelector((state) => state.personalProfile);
  const role = useSelector((state) => state.auth.role);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageFileSizeExceedsLimit, setImageFileSizeExceedsLimit] =
    useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size > 1048576) {
      setImageFileSizeExceedsLimit(true);
      setFile(null);
    } else {
      setImageFileSizeExceedsLimit(false);
      setFile(selectedFile);
    }
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
      <Row className="justify-content-center">
        <Col className="col-11 col-md-7 col-lg-6">
          <Card className="bg-info-subtle border-success border-4 shadow-lg p-4">
            {profileDetail && profileDetail.loading && (
              <Spinner animation="grow" className="text-primary" size="sm" />
            )}
            {profileDetail && profileDetail.profile && (
              <Card.Body>
                <Card.Text className="fw-bolder fs-3 fst-italic text-center text-primary">
                  Benvenuto! {profileDetail.profile.username}
                </Card.Text>
                <Row className="justify-content-center">
                  <Card.Img
                    as="label"
                    htmlFor="fileInput"
                    className=" w-50 my-1 position-relative"
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
                  {imageFileSizeExceedsLimit && (
                    <Alert variant="danger" className="text-center">
                      Image size exceeds the limit (1MB)
                    </Alert>
                  )}
                </Row>
                <Row>
                  <Col className="text-end me-5">
                    <Button
                      className="btn-sm bg-primary text-primary-subtle"
                      onClick={handleUpload}
                      disabled={!file || uploading}
                    >
                      {uploading ? "Uploading..." : "Salva Nuovo Avatar"}
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
                    <Card.Text>{profileDetail.profile.role}</Card.Text>
                  </Col>
                </Row>
                <Card.Text className="fs-5">
                  {profileDetail.profile.email}
                </Card.Text>
                <Button
                  onClick={handleLogout}
                  className="text-primary fw-semibold btn-danger shadow-sm"
                >
                  Logout
                </Button>
              </Card.Body>
            )}
            {profileDetail && profileDetail.error && (
              <p>Error: {profileDetail.error}</p>
            )}
            {(role === "ADMIN" || role === "EVENTPLANNER") && (
              <Link as={Link} to="/addconvention">
                Vuoi aggiungere una fiera alla lista?
              </Link>
            )}
            {role === "ADMIN" && (
              <Link as={Link} to="/requests">
                Vuoi cambiare un utente?
              </Link>
            )}
            {role === "USER" && (
              <Link as={Link} to="/sendrequest" className="mb-3">
                Invia Richiesta
              </Link>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileComponent;
