import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getConventionDetail,
  getConventionSections,
  uploadConventionLogo,
  uploadConventionCover,
} from "../redux/actions/conventionactions";
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Button,
  Modal,
} from "react-bootstrap";
import { BsPencilFill } from "react-icons/bs";

const ConventionDetail = () => {
  const { conventionId } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);

  // caricamento dettagli
  const {
    conventionDetail,
    loading: detailLoading,
    error: detailError,
  } = useSelector((state) => state.conventionDetails);

  // caricamento sezioni
  const {
    sections,
    loading: sectionsLoading,
    error: sectionsError,
  } = useSelector((state) => state.conventionSections);

  const [logoFile, setLogoFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    dispatch(getConventionDetail(conventionId));
    dispatch(getConventionSections(conventionId, page));
  }, [dispatch, conventionId, page]);

  useEffect(() => {
    if (sections) {
      setTotalPages(sections.totalPages);
    }
  }, [sections]);

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

  const handleLogoChange = (event) => {
    setLogoFile(event.target.files[0]);
  };

  const handleCoverChange = (event) => {
    setCoverFile(event.target.files[0]);
  };

  const handleLogoUpload = async () => {
    if (!logoFile) return;

    try {
      await dispatch(uploadConventionLogo(logoFile, conventionId));
      setShowLogoModal(false);
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  const handleCoverUpload = async () => {
    if (!coverFile) return;

    try {
      await dispatch(uploadConventionCover(coverFile, conventionId));
      setShowCoverModal(false);
    } catch (error) {
      console.error("Error uploading cover:", error);
    }
  };

  if (detailLoading || sectionsLoading)
    return <Spinner animation="grow" className="text-info" />;
  if (detailError || sectionsError)
    return <p>Error: {detailError || sectionsError}</p>;
  if (!conventionDetail) return null;

  return (
    <Container className="my-5">
      <Row>
        <Col className="col-11 col-md-6">
          <Card className="p-5 bg-primary-subtle border-info border-4 shadow-lg text-">
            <Card.Img
              variant="top"
              className="p-2"
              src={conventionDetail.coverImage}
              onClick={() => setShowCoverModal(true)}
            />
            <div className="d-flex justify-content-center">
              <Card.Img
                variant="top"
                src={conventionDetail.logo}
                className="w-50 p-3"
                onClick={() => setShowLogoModal(true)}
              />
            </div>
            <Card.Title className="text-center fw-bolder fst-italic text-primary fs-1">
              {conventionDetail.title}
            </Card.Title>
            <Card.Text className="text-center fw-bolder fst-italic text-primary fs-1">
              {conventionDetail.startDate}
            </Card.Text>
            <Card.Text className="text-center fw-bolder fst-italic text-primary fs-1">
              {conventionDetail.endDate}
            </Card.Text>
            <Card.Text className="text-black fw-medium ">
              {conventionDetail.description}
            </Card.Text>
            <Card.Text className="text-black fw-medium ">
              {conventionDetail.address}
            </Card.Text>
          </Card>
        </Col>
        <Col className="col-11 col-md-6 col-lg-5">
          <h2 className="text-info text-center ">Sections</h2>
          {sections.content &&
            sections.content.map((section) => (
              <Card
                key={section.sectionId}
                className="p-1 bg-primary-subtle border-info border-4 shadow-lg my-3"
              >
                <Card.Body>
                  <Link
                    className="text-decoration-none"
                    to={`/conventions/${conventionId}/sec/${section.sectionId}`}
                  >
                    <Card.Img src={section.sectionImage} className="w-50 p-2" />
                    <Card.Title className="text-center fw-bolder fst-italic">
                      {section.sectionTitle}
                    </Card.Title>
                    <Card.Text className="text-black fw-medium ">
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
              className="text-primary-subtle"
            >
              Previous
            </Button>
            <Button
              onClick={nextPage}
              disabled={page + 1 === totalPages}
              className="text-primary-subtle"
            >
              Next
            </Button>
          </div>
          <Link to={`/conventions/${conventionId}/add-section`}>
            <Button className="text-primary bg-info">Create New Section</Button>
          </Link>
        </Col>
      </Row>

      {/* modale per l aggiunta immagini */}
      <Modal
        show={showLogoModal}
        onHide={() => setShowLogoModal(false)}
        className="bg-primary-subtle"
      >
        <Modal.Header closeButton>
          <Modal.Title>Carica il tuo Logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleLogoChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={() => setShowLogoModal(false)}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleLogoUpload}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cover Modal */}
      <Modal show={showCoverModal} onHide={() => setShowCoverModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Carica la tua Cover Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleCoverChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCoverModal(false)}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleCoverUpload}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ConventionDetail;
