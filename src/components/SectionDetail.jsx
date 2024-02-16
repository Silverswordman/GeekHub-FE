import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getSectionDetail,
  getSubsections,
} from "../redux/actions/conventionactions";
import { Spinner, Card, Container, Row, Col, Button } from "react-bootstrap";

import AddSubsection from "./SubsectionAdd";

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
    return <Spinner animation="grow" className="text-info" />;
  if (sectionError || subsectionError)
    return <p>Error: {sectionError || subsectionError}</p>;
  if (!sectionDetail) return null;

  return (
    <Container className="my-5">
      <Row>
        <Col className="col-10 col-md-5">
          <Card className="p-5 bg-primary-subtle border-info border-4 shadow-lg text-">
            <Card.Img
              variant="top"
              className="p-3"
              src={sectionDetail.sectionImage}
            ></Card.Img>
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
          <Button onClick={handlePrevPage} disabled={currentPage === 0}>
            Prev
          </Button>
          <Button onClick={handleNextPage}>Next</Button>
        </Col>
      </Row>

      <Link to={`/conventions/${conventionId}/sec/${sectionId}/add-subsection`}>
        <Button className="text-primary bg-info">
          Crea una nuova sottosezione
        </Button>
      </Link>
    </Container>
  );
};

export default SectionDetail;
