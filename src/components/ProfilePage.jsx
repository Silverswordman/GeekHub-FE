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
import UserFavorites from "./UserFavorites";
import { IoMdAddCircle } from "react-icons/io";
import { BsPersonBoundingBox } from "react-icons/bs";

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
          <Card className="bg-transparent bg-gradient  border-info border-4 shadow-lg p-4">
            {profileDetail && profileDetail.loading && (
              <Spinner animation="grow" className="text-white" size="sm" />
            )}
            {profileDetail && profileDetail.profile && (
              <Card.Body>
                <Card.Text className="fw-bolder fs-3  text-center text-white">
                  Benvenuto!{" "}
                  <h3 className="text-info fw-semibold  fst-italic">
                    {profileDetail.profile.username}
                  </h3>
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
                      className="position-absolute top-100 start-50 translate-middle badge bg-success-subtle z-1 "
                      style={{
                        width: "30px",
                        height: "25px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    >
                      <BsPencilFill className="text-muted" />
                    </Badge>
                    {profileDetail.loading ? (
                      <Spinner
                        animation="grow"
                        className="text-white"
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
                          className="w-100 h-100 rounded-circle border border-5 border-success-subtle hover-scale z-0"
                        />
                      </>
                    )}
                  </Card.Img>
                  {imageFileSizeExceedsLimit && (
                    <Alert
                      variant="danger text-black fw-semibold"
                      className="text-center mt-4"
                    >
                      Dimensioni massime per immagine 1MB
                    </Alert>
                  )}
                </Row>
                <Row>
                  <Col className="text-end me-5">
                    <Button
                      className="btn-sm bg-primary border border-1 border-success-subtle text-white-subtle hover-scale"
                      onClick={handleUpload}
                      disabled={!file || uploading}
                    >
                      {uploading ? "Caricamento..." : "Salva Nuovo Avatar"}
                    </Button>
                  </Col>
                </Row>
                <Row className="align-items-baseline">
                  <Col className="col-5">
                    <Card.Text className="fs-5 text-white mt-4 fw-semibold fst-italic">
                      {profileDetail.profile.name}{" "}
                      {profileDetail.profile.surname}
                    </Card.Text>
                  </Col>
                  <Col className="col-5 text-end text-white opacity-75">
                    <Card.Text>{profileDetail.profile.role}</Card.Text>
                  </Col>
                </Row>
                <Card.Text className="fs-5 text-white fst-italic">
                  {profileDetail.profile.email}
                </Card.Text>
              </Card.Body>
            )}
            {profileDetail && profileDetail.error && (
              <p>Error: {profileDetail.error}</p>
            )}
            {(role === "ADMIN" || role === "EVENTPLANNER") && (
              <Row>
                <Col>
                  <Button className="rounded-pill hover-scale">
                    <Link
                      as={Link}
                      to="/addconvention"
                      className="text-white text-decoration-none "
                    >
                      <IoMdAddCircle className="me-1" />
                      Vuoi aggiungere una fiera al sito?
                    </Link>
                  </Button>
                </Col>{" "}
              </Row>
            )}
            {role === "ADMIN" && (
              <Row>
                <Col>
                  <Button className="rounded-pill hover-scale">
                    <Link
                      as={Link}
                      to="/requests"
                      className="text-white text-decoration-none "
                    >
                      {" "}
                      <BsPersonBoundingBox className="me-1 small" />
                      Vuoi cambiare il ruolo di un utente?
                    </Link>
                  </Button>
                </Col>
              </Row>
            )}
            {role === "USER" && (
              <Row>
                <Col>
                  <Button className="small rounded-pill hover-scale">
                    <Link
                      as={Link}
                      to="/sendrequest"
                      className="mb-3 text-white text-decoration-none  "
                    ><BsPersonBoundingBox className="me-1 small" />
                      Manda una richiesta per diventare un organizzatore di
                      eventi !
                    </Link>
                  </Button>
                </Col>
              </Row>
            )}
            <Row className="text-end">
              <Col>
                <Button
                  onClick={handleLogout}
                  className="mt-3 text-secondary fst-italic fw-bold btn-danger border border-3 border-success-subtle shadow-sm btn-sm hover-scale"
                >
                  Logout
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <UserFavorites></UserFavorites>
    </Container>
  );
};

export default ProfileComponent;
