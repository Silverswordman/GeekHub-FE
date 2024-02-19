import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getSectionDetail,
  getSubsections,
  uploadSectionImage,
} from "../redux/actions/conventionactions";
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

  const [currentPage, setCurrentPage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileSizeExceedsLimit, setImageFileSizeExceedsLimit] = useState(false);

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
          <Card className="p-5 bg-primary-subtle border-info border-4 shadow-lg ">
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
              >
                <BsPencilFill />
              </Badge>
            )}
            <Card.Title className="text-center fw-bolder fst-italic text-primary fs-3">
              {sectionDetail.sectionTitle}
            </Card.Title>
            <Card.Text className="text-black fw-medium ">
              {sectionDetail.sectionSubtitle}
            </Card.Text>
            <Card.Text className="text-black fw-medium ">
              {sectionDetail.creator.userId}
            </Card.Text>
          </Card>
        </Col>
        <Col className="col-11 col-md-6 col-lg-5">
          <h2 className="text-info text-center ">Subsections</h2>
          {Array.isArray(subsections.content) &&
            subsections.content.map((subsection) => (
              <Card key={subsection.subsectionId}>
                <Card.Title>{subsection.subsectionTitle}</Card.Title>
                <Card.Text>{subsection.subsectionDescription}</Card.Text>
              </Card>
            ))}
          <div className="d-flex justify-content-between mt-4">
            <Button onClick={handlePrevPage} disabled={currentPage === 0}>
              Prev
            </Button>
            <Button onClick={handleNextPage}>Next</Button>
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

      {/* Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Section Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" onChange={handleImageChange} />
          {imageFileSizeExceedsLimit && (
            <Alert variant="danger">Image size exceeds the limit (1MB)</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleImageSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SectionDetail;
