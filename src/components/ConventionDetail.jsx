// ConventionDetail.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; 
import { getConventionDetail } from "../redux/actions/conventionactions";
import { Card, Container } from "react-bootstrap";

const ConventionDetailCard = () => {
  const { conventionId } = useParams(); 
  const dispatch = useDispatch();
  const { conventionDetail, loading, error } = useSelector(
    (state) => state.conventionDetails 
  );

  useEffect(() => {
    dispatch(getConventionDetail(conventionId));
  }, [dispatch, conventionId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
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
    </Container>
  );
};

export default ConventionDetailCard;
