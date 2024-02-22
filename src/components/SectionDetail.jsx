import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getSectionDetail,
  getSubsections,
} from "../redux/actions/conventionactions";
import {
  deleteSection,
  deleteSubsection,
} from "../redux/actions/update&deleteactions";
import { uploadSectionImage } from "../redux/actions/uploadactions";
import { LuArrowBigLeftDash, LuArrowBigRightDash } from "react-icons/lu";

import {
  Spinner,
  Card,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Badge,
  Alert,
} from "react-bootstrap";
import { BsPencilFill } from "react-icons/bs";

const SectionDetail = () => {
  const { sectionId, conventionId } = useParams();
  const dispatch = useDispatch();
  const { role, userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    sectionDetail,
    loading: sectionLoading,
    error: sectionError,
  } = useSelector((state) => state.sectionDetails);
  const {
    subsections,
    loading: subsectionLoading,
    error: subsectionError,
  } = useSelector((state) => state.subsections);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileSizeExceedsLimit, setImageFileSizeExceedsLimit] =
    useState(false);

  useEffect(() => {
    dispatch(getSectionDetail(conventionId, sectionId));
    dispatch(getSubsections(conventionId, sectionId, currentPage));
  }, [dispatch, conventionId, sectionId, currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleImageClick = () => {
    if (sectionDetail.creator.userId === userId || role === "ADMIN") {
      setShowImageModal(true);
    }
  };

  const handleDelete = () => {
    dispatch(deleteSection(conventionId, sectionId));
    navigate(`/convention/${conventionId}`);

    setShowDeleteModal(false);
  };

  const [showDeleteSubsectionModal, setShowDeleteSubsectionModal] =
    useState(false);
  const [subsectionIdToDelete, setSubsectionIdToDelete] = useState(null);

  const handleDeleteSubsection = () => {
    if (!subsectionIdToDelete) return; // Controllo di sicurezza aggiuntivo

    dispatch(deleteSubsection(conventionId, sectionId, subsectionIdToDelete));
    navigate(`/convention/${conventionId}/sec/${sectionId}`);
    setShowDeleteSubsectionModal(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 1048576) {
      setImageFileSizeExceedsLimit(true);
      setImageFile(null);
    } else {
      setImageFileSizeExceedsLimit(false);
      setImageFile(file);
    }
  };

  const handleImageSave = async () => {
    if (!imageFile) return;

    try {
      await dispatch(uploadSectionImage(conventionId, sectionId, imageFile));
      setShowImageModal(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (sectionLoading || subsectionLoading)
    return <Spinner animation="grow" className="text-info" />;
  if (sectionError || subsectionError)
    return <p>Error: {sectionError || subsectionError}</p>;
  if (!sectionDetail) return null;

  return (
    <Container className="my-5">
      <Row>
        <Col className="col-10 col-md-5">
          <Card className="p-5 bg-primary bg-gradient border-info border-4 shadow-lg ">
            <Card.Img
              variant="top"
              className=" border border-4 border-info rounded-start-5 rounded-top-5 position-relative"
              src={sectionDetail.sectionImage}
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
            {(role === "ADMIN" || userId === sectionDetail.creator.userId) && (
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
                onClick={handleImageClick}
              >
                <BsPencilFill />
              </Badge>
            )}
            <Card.Title className="text-center fw-bolder fst-italic text-info fs-3">
              {sectionDetail.sectionTitle}
            </Card.Title>
            <Card.Text className="text-white fw-medium ">
              {sectionDetail.sectionSubtitle}
            </Card.Text>

            {(role === "ADMIN" || userId === sectionDetail.creator.userId) && (
              <Row className="mb-3">
                <Col>
                  <Link
                    to={`/conventions/${conventionId}/sec/${sectionId}/updatesection`}
                  >
                    <Button variant="danger">Modifica</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Elimina
                  </Button>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
        <Col className="col-11 col-md-6 col-lg-5">
          <h2 className="text-info text-center ">Subsections</h2>
          {Array.isArray(subsections.content) &&
            subsections.content.map((subsection) => (
              <Card
                key={subsection.subsectionId}
                className="p-1 bg-primary bg-gradient border-info border-4 shadow-lg my-3 text-white"
              >
                <Card.Title>{subsection.subsectionTitle}</Card.Title>
                <Card.Text>{subsection.subsectionDescription}</Card.Text>
                {(role === "ADMIN" ||
                  userId === sectionDetail.creator.userId) && (
                  <div>
                    <Link
                      to={`/conventions/${conventionId}/sec/${sectionId}/${subsection.subsectionId}/updatesubsection`}
                    >
                      <Button variant="danger">Modifica Sotto-Sezione</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setSubsectionIdToDelete(subsection.subsectionId);
                        setShowDeleteSubsectionModal(true);
                      }}
                    >
                      Elimina Sotto-Sezione
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          <div className="d-flex justify-content-between mt-4">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="bg-primary border-1 border-info"
            >
              <LuArrowBigLeftDash className="fs-5 fw-bolder" />
            </Button>
            <Button
              onClick={handleNextPage}
              className="bg-primary border-1 border-info"
            >
              <LuArrowBigRightDash className="fs-5 fw-bolder" />
            </Button>
          </div>
          {(sectionDetail.creator.userId === userId || role === "ADMIN") && (
            <Link
              to={`/conventions/${conventionId}/sec/${sectionId}/add-subsection`}
            >
              <Button className="text-primary bg-info">
                Create New Subsection
              </Button>
            </Link>
          )}
        </Col>
      </Row>

      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton className="bg-info-subtle">
          <Modal.Title>Cambia l'immagine della Sezione</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-primary-subtle">
          <input type="file" onChange={handleImageChange} />
          {imageFileSizeExceedsLimit && (
            <Alert variant="danger">
              Dimensioni massime per dell'immagine 1MB
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-info-subtle">
          <Button
            variant="danger"
            onClick={() => setShowImageModal(false)}
            className="fw-bolder"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleImageSave}
            className="fw-bolder"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for subsection deletion confirmation */}
      <Modal
        show={showDeleteSubsectionModal}
        onHide={() => {
          setSubsectionIdToDelete(null);
          setShowDeleteSubsectionModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Elimina Sotto-Sezione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare questa sotto-sezione?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setSubsectionIdToDelete(null);
              setShowDeleteSubsectionModal(false);
            }}
          >
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDeleteSubsection}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for section deletion confirmation */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Elimina Sezione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questa sezione?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SectionDetail;
