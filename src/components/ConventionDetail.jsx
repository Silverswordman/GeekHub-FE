import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/actions/profileactions";

import {
  getConventionDetail,
  getConventionSections,
} from "../redux/actions/conventionactions";
import { deleteConvention } from "../redux/actions/update&deleteactions";
import {
  uploadConventionLogo,
  uploadConventionCover,
} from "../redux/actions/uploadactions";
import { format } from "date-fns";
import it from "date-fns/locale/it";
import { LuArrowBigLeftDash, LuArrowBigRightDash } from "react-icons/lu";

import { BsPencilFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

import { MdOutlineFiberNew } from "react-icons/md";

import {
  Container,
  Row,
  Col,
  Spinner,
  Modal,
  Button,
  Alert,
  Card,
  Badge,
} from "react-bootstrap";

const ConventionDetail = () => {
  const { conventionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [logoFileSizeExceedsLimit, setLogoFileSizeExceedsLimit] =
    useState(false);
  const [coverFileSizeExceedsLimit, setCoverFileSizeExceedsLimit] =
    useState(false);
  const { role } = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.auth.userId);
  const {
    conventionDetail,
    loading: detailLoading,
    error: detailError,
  } = useSelector((state) => state.conventionDetails);
  const {
    sections,
    loading: sectionsLoading,
    error: sectionsError,
  } = useSelector((state) => state.conventionSections);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { favoriteConventions } = useSelector((state) => state.users);
  const isFavorite = favoriteConventions.some(
    (convention) => convention.conventionId === conventionId
  );

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(userId, conventionId));
    navigate(`/convention/${conventionId}`, { replace: true });
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(userId, conventionId));
    navigate(`/convention/${conventionId}`, { replace: true });
  };

  useEffect(() => {
    dispatch(getConventionDetail(conventionId));
    dispatch(getConventionSections(conventionId, page));
  }, [dispatch, conventionId, page]);

  useEffect(() => {
    if (sections) {
      setTotalPages(sections.totalPages);
    }
  }, [sections]);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 1048576) {
      setLogoFileSizeExceedsLimit(true);
      setLogoFile(null);
    } else {
      setLogoFileSizeExceedsLimit(false);
      setLogoFile(file);
    }
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 1048576) {
      setCoverFileSizeExceedsLimit(true);
      setCoverFile(null);
    } else {
      setCoverFileSizeExceedsLimit(false);
      setCoverFile(file);
    }
  };

  const handleLogoUpload = async () => {
    if (!logoFile) return;

    try {
      await dispatch(uploadConventionLogo(logoFile, conventionId));
      setShowLogoModal(false);
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Error uploading logo. Please try again.");
    }
  };

  const handleCoverUpload = async () => {
    if (!coverFile) return;

    try {
      await dispatch(uploadConventionCover(coverFile, conventionId));
      setShowCoverModal(false);
    } catch (error) {
      console.error("Error uploading cover:", error);
      alert("Error uploading cover. Please try again.");
    }
  };

  const nextPage = () => {
    if (page + 1 < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleDelete = () => {
    dispatch(deleteConvention(conventionId));
    navigate("/home");
  };

  if (detailLoading || sectionsLoading)
    return <Spinner animation="grow" className="text-info" />;
  if (detailError || sectionsError)
    return <p>Error: {detailError || sectionsError}</p>;
  if (!conventionDetail) return null;

  return (
    <Container className="my-5">
      <Row>
        <Col className="col-12 col-sm-11 col-md-6 my-3">
          <Card className="p-5 bg-primary bg-gradient  border-info border-4 shadow-lg text-white">
            <Card.Img
              variant="top"
              className={`border mb-4 border-info border-5 rounded-start-5 rounded-top-5 position-relative ${
                role !== "ADMIN" &&
                userId !== conventionDetail.creator.userId &&
                "no-pointer"
              }`}
              src={conventionDetail.coverImage}
              onClick={() => setShowCoverModal(true)}
              style={{
                cursor:
                  role === "ADMIN" || userId === conventionDetail.creator.userId
                    ? "pointer"
                    : "default",
              }}
            />
            {(role === "ADMIN" ||
              userId === conventionDetail.creator.userId) && (
              <Badge
                pill
                bg="primary"
                className="position-absolute badge bg-info"
                style={{
                  width: "30px",
                  height: "25px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={() => setShowCoverModal(true)}
              >
                <BsPencilFill />
              </Badge>
            )}
            <Row className="align-items-center mt-2 justify-content-md-center mb-md-3">
              <Col className="col-8 col-sm-9 col-md-11 col-lg-6 mb-4 md-md-5 ">
                <Card.Img
                  variant="top"
                  src={conventionDetail.logo}
                  className={`w-50 border border-4 border-info bg-success rounded-pill position-relative ${
                    role !== "ADMIN" &&
                    userId !== conventionDetail.creator.userId &&
                    "no-pointer"
                  }`}
                  style={{
                    cursor:
                      role === "ADMIN" ||
                      userId === conventionDetail.creator.userId
                        ? "pointer"
                        : "default",
                  }}
                  onClick={() => setShowLogoModal(true)}
                />
                {(role === "ADMIN" ||
                  userId === conventionDetail.creator.userId) && (
                  <Badge
                    pill
                    bg="primary"
                    className="position-absolute translate-middle-x badge bg-primary border border-1 border border-2 border-info"
                    style={{
                      width: "30px",
                      height: "25px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowLogoModal(true)}
                  >
                    <BsPencilFill />
                  </Badge>
                )}
              </Col>
              <Col className="col-12 col-sm-11 col-lg-6 ">
                <Card.Title className="text-center fw-bolder fst-italic text-white fs-1">
                  {conventionDetail.title}
                </Card.Title>
              </Col>
            </Row>

            <Card.Text className="text-center fw-bolder fst-italic text-white ">
              {format(new Date(conventionDetail.startDate), "dd/MMMM/yyyy", {
                locale: it,
              })}
            </Card.Text>
            <Card.Text className="text-center fw-bolder fst-italic text-white ">
              {format(new Date(conventionDetail.endDate), "dd/MMMM/yyyy", {
                locale: it,
              })}
            </Card.Text>
            <Card.Text className="text-white fw-medium ">
              {conventionDetail.description}
            </Card.Text>
            <Card.Text className="text-white fw-medium ">
              {conventionDetail.address}
            </Card.Text>
            <Card.Text className="text-white fw-medium ">
              {conventionDetail.region.regionName} ,{" "}
              {conventionDetail.province.sigla},{" "}
              {conventionDetail.city.cityName}
            </Card.Text>
            {(role === "ADMIN" ||
              userId === conventionDetail.creator.userId) && (
              <Row className="mt-5 mb-1 justify-content-end ">
                <Col className="col-12 col-sm-12 col-md-6 mb-2 mb-md-0  text-end ">
                  <Link to={`/updateconvention/${conventionId}`}>
                    <Button
                      variant="danger"
                      className="btn-sm border border-2 border-info  text-secondary  fw-bold shadow-sm rounded-pill px-2"
                    >
                      Modifica <BsPencilFill />
                    </Button>
                  </Link>
                </Col>
                <Col className="col-12 col-sm-12 col-md-6 col-lg-3 text-end align-content-center ">
                  <Button
                    variant="warning"
                    className="btn-sm border border-2 border-info  text-secondary fw-bold shadow-sm rounded-pill px-2"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Elimina <RiDeleteBin6Line />
                  </Button>
                </Col>
              </Row>
            )}
            {(role === "ADMIN" || role === "USER") &&
              (isFavorite ? (
                <Button
                  variant="outline-info"
                  className="btn-sm rounded-pill border border-2 border-white fw-bold"
                  onClick={handleRemoveFromFavorites}
                >
                  Rimuovi dai preferiti
                </Button>
              ) : (
                <Button
                  variant="info"
                  className="btn-sm rounded-pill border border-2 border-white fw-bold"
                  onClick={handleAddToFavorites}
                >
                  Aggiungi ai preferiti
                </Button>
              ))}
          </Card>
        </Col>
        <Col className="col-11 col-md-6 col-lg-5">
          <h2 className="text-info text-center fw-bolder  fst-italic   fs-1 shadow-sm ">
            Sections
          </h2>
          {sections.content &&
            sections.content.map((section) => (
              <Card
                key={section.sectionId}
                className="p-1 bg-primary bg-gradient border-info border-4 shadow-lg my-3"
              >
                <Card.Body>
                  <Link
                    className="text-decoration-none"
                    to={`/conventions/${conventionId}/sec/${section.sectionId}`}
                  >
                    <Card.Img
                      src={section.sectionImage}
                      className="w-50 border border-4 border-info rounded-start-5 rounded-top-5 mb-4 mb-md-2"
                    />
                    <Card.Title className="text-center text-white fw-bolder fst-italic">
                      {section.sectionTitle}
                    </Card.Title>
                    <Card.Text className="text-black fw-medium text-white ">
                      {section.sectionSubtitle}
                    </Card.Text>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          <div className="d-flex justify-content-between mt-4">
            <Button
              onClick={prevPage}
              disabled={page === 0}
              className="text-primary-subtle bg-primary border-1 border-info "
            >
              <LuArrowBigLeftDash className="fs-5 fw-bolder" />
            </Button>
            <Button
              onClick={nextPage}
              disabled={page + 1 === totalPages}
              className="text-primary-subtle bg-primary border-1 border-info "
            >
              <LuArrowBigRightDash className="fs-5 fw-bolder" />
            </Button>
          </div>
          <Row>
            <Col className="text-end mt-5">
              <Link to={`/conventions/${conventionId}/add-section`}>
                {(role === "ADMIN" ||
                  userId === conventionDetail.creator.userId) && (
                  <Button className="text-primary bg-info rounded-pill border border-2 border-white fw-bold btn-sm ">
                    <MdOutlineFiberNew className="fw-2 fs-2" />
                    Crea una nuova sezione
                  </Button>
                )}
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header closeButton className="bg-info-subtle">
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-primary-subtle">
          Sei sicuro di voler eliminare questa convenzione?
        </Modal.Body>
        <Modal.Footer className="bg-info-subtle">
          <Button variant="danger" onClick={handleDelete} className="fw-bolder">
            Si
          </Button>
          <Button
            variant="primary"
            onClick={() => setShowDeleteModal(false)}
            className="fw-bolder"
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Logo Upload Modal */}
      {(role === "ADMIN" || userId === conventionDetail.creator.userId) && (
        <Modal show={showLogoModal} onHide={() => setShowLogoModal(false)}>
          <Modal.Header closeButton className="bg-info-subtle">
            <Modal.Title>Carica il tuo Logo</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-primary-subtle">
            <p>Dimensioni massime per immagine 1MB</p>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleLogoChange}
            />
            {logoFileSizeExceedsLimit && (
              <Alert variant="danger">Dimensione massima superata (1MB)</Alert>
            )}
          </Modal.Body>
          <Modal.Footer className="bg-info-subtle">
            <Button
              variant="danger"
              onClick={() => setShowLogoModal(false)}
              className="fw-bolder"
            >
              Chiudi
            </Button>
            <Button
              variant="primary"
              onClick={handleLogoUpload}
              className="fw-bolder"
            >
              Salva
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Cover Upload Modal */}
      {(role === "ADMIN" || userId === conventionDetail.creator.userId) && (
        <Modal show={showCoverModal} onHide={() => setShowCoverModal(false)}>
          <Modal.Header closeButton className="bg-info-subtle">
            <Modal.Title>Cambia l' immagine dell'Evento</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-primary-subtle">
            <p>Dimensioni massime per dell'immagine 1MB</p>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleCoverChange}
            />
            {coverFileSizeExceedsLimit && (
              <Alert variant="danger">Dimensione massima superata (1MB)</Alert>
            )}
          </Modal.Body>
          <Modal.Footer className="bg-info-subtle">
            <Button
              variant="danger"
              onClick={() => setShowCoverModal(false)}
              className="fw-bolder"
            >
              Chiudi
            </Button>
            <Button
              variant="primary"
              onClick={handleCoverUpload}
              className="fw-bolder"
            >
              Salva
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ConventionDetail;
