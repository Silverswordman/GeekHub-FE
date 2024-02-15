import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getConventionDetail,
  getConventionSections,
} from "../redux/actions/conventionactions";
import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";

const ConventionDetail = () => {
  const { conventionId } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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

  if (detailLoading || sectionsLoading)
    return <Spinner animation="grow" className="text-info" size="sm" />;
  if (detailError || sectionsError)
    return <p>Error: {detailError || sectionsError}</p>;
  if (!conventionDetail) return null;

  return (
    <Container className="my-5">
      <Row>
        <Col className="col-11 col-md-6">
          <Card className="p-5 bg-primary-subtle border-info border-4 shadow-lg">
            <Card.Img variant="top" src={conventionDetail.coverImage} />
            <Card.Img
              variant="top"
              src={conventionDetail.logo}
              className="w-50"
            />
            <Card.Title>{conventionDetail.title}</Card.Title>
            <Card.Text>{conventionDetail.startDate}</Card.Text>
            <Card.Text>{conventionDetail.endDate}</Card.Text>
            <Card.Text>{conventionDetail.address}</Card.Text>
            <Card.Text>{conventionDetail.city.cityName}</Card.Text>
          </Card>
        </Col>
        <Col className="col-11 col-md-6">
          <h2 className="text-info">Sections</h2>
          {sections.content &&
            sections.content.map((section) => (
              <Card
                key={section.sectionId}
                className="p-1 bg-primary-subtle border-info border-4 shadow-lg"
              >
                <Card.Body>
                  <Card.Img src={section.sectionImage} className="w-50 " />
                  <Card.Title>{section.sectionTitle}</Card.Title>
                  <Card.Text>{section.sectionSubtitle}</Card.Text>
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
          <Link to={`/conventions/${conventionId}/new-section`}>
            <Button className="text-primary bg-info">Create New Section</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ConventionDetail;
