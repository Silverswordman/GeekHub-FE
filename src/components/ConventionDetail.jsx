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
  Badge,
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

  //paging logic
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
  //

  // upload logo e cover
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

  //

  if (detailLoading || sectionsLoading)
    return <Spinner animation="grow" className="text-info" />;
  if (detailError || sectionsError)
    return <p>Error: {detailError || sectionsError}</p>;
  if (!conventionDetail) return null;

  return (
    <Container className="my-5">
      <Row>
        <Col className="col-11 col-sm-11 col-md-6 my-3">
          <Card className="p-5 bg-primary-subtle border-info border-4 shadow-lg text-">
            <Card.Img
              variant="top"
              className=" border border-info border-5 rounded-start-5 rounded-top-5 position-relative"
              src={conventionDetail.coverImage}
              onClick={() => setShowCoverModal(true)}
              style={{ cursor: "pointer" }}
            />
            <Badge
              pill
              bg="primary"
              className="position-absolute  badge bg-info"
              style={{
                width: "30px",
                height: "25px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <BsPencilFill />
            </Badge>
            <Row className="align-items-center mt-2 justify-content-md-center">
              <Col className="col-12 col-sm-11 col-lg-6 ">
                <Card.Img
                  variant="top"
                  src={conventionDetail.logo}
                  className="w-50 border border-3 border-primary-subtle rounded-pill position-relative  "
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowLogoModal(true)}
                />{" "}
                <Badge
                  pill
                  bg="primary"
                  className="position-absolute  translate-middle-x text-info-subtle badge bg-primary-subtle border border-1  border-info"
                  style={{
                    width: "30px",
                    height: "25px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  <BsPencilFill />
                </Badge>
              </Col>
              <Col className="col-12 col-sm-11 col-lg-6 ">
                <Card.Title className="text-center fw-bolder fst-italic text-primary fs-1">
                  {conventionDetail.title}
                </Card.Title>
              </Col>
            </Row>
            <Card.Text className="text-center fw-bolder fst-italic text-primary ">
              {conventionDetail.startDate}
            </Card.Text>
            <Card.Text className="text-center fw-bolder fst-italic text-primary ">
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
                    <Card.Img
                      src={section.sectionImage}
                      className="w-50  border border-4 border-info rounded-start-5 rounded-top-5"
                    />
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

      {/* modale per logo */}

      <Modal show={showLogoModal} onHide={() => setShowLogoModal(false)}>
        <Modal.Header closeButton className="bg-info-subtle">
          <Modal.Title>Carica il tuo Logo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-primary-subtle">
          <p>Dimensioni massime per l immagine 1mega</p>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleLogoChange}
          />
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

      {/* modale cover */}

      <Modal show={showCoverModal} onHide={() => setShowCoverModal(false)}>
        <Modal.Header closeButton className="bg-info-subtle">
          <Modal.Title>Carica la tua Cover Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-primary-subtle">
          <p>Dimensioni massime per l immagine 1mega</p>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleCoverChange}
          />
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
    </Container>
  );
};

export default ConventionDetail;
