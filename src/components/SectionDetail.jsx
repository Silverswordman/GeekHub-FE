import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSectionDetail,
  getSubsections,
} from "../redux/actions/conventionactions";
import { Spinner, Card, Container, Row, Col, Button } from "react-bootstrap";

const SectionDetail = () => {
  const { sectionId, conventionId } = useParams();
  const dispatch = useDispatch();

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

  // State per il numero di pagina corrente
  const [currentPage, setCurrentPage] = useState(0);

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

  if (sectionLoading || subsectionLoading)
    return <Spinner animation="grow" className="text-info" size="sm" />;
  if (sectionError || subsectionError)
    return <p>Error: {sectionError || subsectionError}</p>;
  if (!sectionDetail) return null;

  return (
    <Container>
      <Row>
        <Col className="col-11 col-md-6">
          <Card>
            <Card.Title>{sectionDetail.sectionTitle}</Card.Title>
            <Card.Text>{sectionDetail.sectionSubtitle}</Card.Text>
          </Card>
        </Col>
        <Col className="col-11 col-md-6">
          <h3>Subsections:</h3>
          {Array.isArray(subsections.content) &&
            subsections.content.map((subsection) => (
              <Card key={subsection.id}>
                <Card.Title>{subsection.title}</Card.Title>
                <Card.Text>{subsection.description}</Card.Text>
                {/* Altri dettagli della sottosezione */}
              </Card>
            ))}
          {/* Paging delle sottosezioni */}
          <Button onClick={handlePrevPage} disabled={currentPage === 0}>
            Prev
          </Button>
          <Button onClick={handleNextPage}>Next</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SectionDetail;
