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

import { RiDeleteBin6Line } from "react-icons/ri";

import { MdOutlineFiberNew } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";

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
import { TiStarFullOutline } from "react-icons/ti";

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
    dispatch(getSubsections(conventionId, sectionId, currentPage,4));
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
    if (!subsectionIdToDelete) return;

    dispatch(deleteSubsection(conventionId, sectionId, subsectionIdToDelete));
    navigate(`/conventions/${conventionId}/sec/${sectionId}`);
    dispatch(getSubsections(conventionId, sectionId, currentPage));

    dispatch(getSectionDetail(conventionId, sectionId));

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
    <Container className="my-5 fadefromleft">
      <Row>
        <Col className="col-12 col-md-10 col-lg-6 ">
          <Card className="p-5 bg-primary bg-gradient border-info border-4 shadow-lg ">
            <Card.Img
              variant="top"
              className=" bg-secondary bg-gradient border border-4 border-info rounded-start-5 rounded-top-5 position-relative"
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
            <Card.Title className="text-center fw-bolder fst-italic text-info fs-3 mt-4">
              <TiStarFullOutline className="me-3" />
              {sectionDetail.sectionTitle}
            </Card.Title>
            <Card.Text className="text-white fw-medium fs-5 ms-5">
              {sectionDetail.sectionSubtitle}
            </Card.Text>

            {(role === "ADMIN" || userId === sectionDetail.creator.userId) && (
              <Row className="mt-5 mb-1 justify-content-end ">
                <Col className="col-12 col-sm-12 col-md-6 mb-2 mb-md-0  text-end ">
                  <Link
                    to={`/conventions/${conventionId}/sec/${sectionId}/updatesection`}
                  >
                    <Button
                      variant="danger"
                      className="btn-sm border border-2 border-info  text-secondary  fw-bold shadow-sm rounded-pill px-2 hover-scale"
                    >
                      Modifica <BsPencilFill />
                    </Button>
                  </Link>
                </Col>
                <Col className="col-12 col-sm-12 col-md-12 col-lg-4 text-end align-content-center ">
                  <Button
                    className="btn-sm border border-2 border-info  text-secondary fw-bold shadow-sm rounded-pill px-2 hover-scale"
                    variant="warning"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Elimina <RiDeleteBin6Line />
                  </Button>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
        <Col className="col-12 col-md-10 col-lg-5">
          <p className="text-info text-center fw-bold  fst-italic fs-2 shadow-sm ">
            Ecco cosa troverai!{" "}
          </p>
          {Array.isArray(subsections.content) &&
            subsections.content.map((subsection) => (
              <Card
                key={subsection.subsectionId}
                className="p-1 bg-transparent bg-gradient border-info border-4 shadow-lg my-3 text-white "
              >
                <Card.Body>
                  <Card.Title className="fs-3 text-center fst-italic">
                    {subsection.subsectionTitle}
                  </Card.Title>
                  <Card.Text className="fs-5 ms-2 p-1">
                    {subsection.subsectionDescription}
                  </Card.Text>
                  <Card.Text className="fst-italic ms-2">
                    {subsection.subsectionTime ? (
                      <>
                        <LuCalendarClock className="me-2" />
                        {subsection.subsectionTime}
                      </>
                    ) : null}
                  </Card.Text>
                </Card.Body>
                {(role === "ADMIN" ||
                  userId === sectionDetail.creator.userId) && (
                  <Row className="mt-5 mb-2 me-1 justify-content-end ">
                    <Col className="col-12 col-sm-12 col-md-6 mb-2 mb-md-0  text-end ">
                      <Link
                        to={`/conventions/${conventionId}/sec/${sectionId}/${subsection.subsectionId}/updatesubsection`}
                      >
                        <Button
                          variant="danger"
                          className="btn-sm border border-2 border-info  text-secondary fw-bold shadow-sm rounded-pill px-2 me-sm-1 hover-scale"
                        >
                          {" "}
                          Modifica <BsPencilFill />
                        </Button>
                      </Link>
                      <Button
                        className="btn-sm border border-2 border-info  text-secondary fw-bold shadow-sm rounded-pill px-2 hover-scale"
                        variant="warning"
                        onClick={() => {
                          setSubsectionIdToDelete(subsection.subsectionId);
                          setShowDeleteSubsectionModal(true);
                        }}
                      >
                        Elimina <RiDeleteBin6Line />
                      </Button>
                    </Col>
                  </Row>
                )}
              </Card>
            ))}
          <div className="d-flex justify-content-between mt-4">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="bg-primary border-1 border-info hover-scale"
            >
              <LuArrowBigLeftDash className="fs-5 fw-bolder" />
            </Button>
            <Button
              onClick={handleNextPage}
              className="bg-primary border-1 border-info hover-scale"
            >
              <LuArrowBigRightDash className="fs-5 fw-bolder" />
            </Button>
          </div>
          <Row>
            <Col className="text-end mt-5">
              {(sectionDetail.creator.userId === userId ||
                role === "ADMIN") && (
                <Link
                  to={`/conventions/${conventionId}/sec/${sectionId}/add-subsection`}
                >
                  <Button className="text-primary bg-info rounded-pill border border-2 border-white fw-bold btn-sm hover-scale">
                    <MdOutlineFiberNew className="fw-2 fs-2" />
                    Crea una nuova sezione
                  </Button>
                </Link>
              )}{" "}
            </Col>
          </Row>
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
            className="fw-bolder hover-scale"
          >
            Chiudi
          </Button>
          <Button
            variant="primary"
            onClick={handleImageSave}
            className="fw-bolder hover-scale"
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteSubsectionModal}
        onHide={() => {
          setSubsectionIdToDelete(null);
          setShowDeleteSubsectionModal(false);
        }}
      >
        <Modal.Header closeButton className="bg-info-subtle">
          <Modal.Title>Elimina Sezione</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-primary-subtle">
          Sei sicuro di voler eliminare questa sezione?
        </Modal.Body>
        <Modal.Footer className="bg-info-subtle">
          <Button
            variant="secondary"
            onClick={() => {
              setSubsectionIdToDelete(null);
              setShowDeleteSubsectionModal(false);
            }}
            className="fw-bold hover-scale"
          >
            Annulla
          </Button>
          <Button
            className="fw-bold hover-scale"
            variant="danger"
            onClick={handleDeleteSubsection}
          >
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="bg-info-subtle">
          <Modal.Title>Elimina Sezione</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-primary-subtle fw-semibold">
          Sei sicuro di voler eliminare questa sezione?
        </Modal.Body>
        <Modal.Footer className="bg-info-subtle">
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
