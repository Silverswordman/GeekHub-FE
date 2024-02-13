import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getConventionDetail,
  getConventionSections,
} from "../redux/actions/conventionactions";
import { Card, Container } from "react-bootstrap";

const ConventionDetail = () => {
  const { conventionId } = useParams();
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(getConventionDetail(conventionId));
    dispatch(getConventionSections(conventionId));
  }, [dispatch, conventionId]);

  if (detailLoading || sectionsLoading) return <p>Loading...</p>;
  if (detailError || sectionsError)
    return <p>Error: {detailError || sectionsError}</p>;
  if (!conventionDetail) return null;

  return (
    <Container className="my-5">
      <Card>
        <Card.Img variant="top" src={conventionDetail.coverImage} />
        <Card.Img variant="top" src={conventionDetail.logo} />

        <Card.Title>{conventionDetail.title}</Card.Title>
        <Card.Title>{conventionDetail.startDate}</Card.Title>
        <Card.Title>{conventionDetail.endDate}</Card.Title>
        <Card.Title>{conventionDetail.address}</Card.Title>
        <Card.Title>{conventionDetail.city.cityName}</Card.Title>
      </Card>

      <Container className="mt-3">
        <h2>Sections</h2>
        {Array.isArray(sections.content) &&
          sections.content.map((section) => (
            <Card key={section.id}>
              <Card.Body>
                <Card.Title>{section.sectionTitle}</Card.Title>
                {/* Render other details of the section here */}
              </Card.Body>
            </Card>
          ))}
      </Container>
    </Container>
  );
};

export default ConventionDetail;
