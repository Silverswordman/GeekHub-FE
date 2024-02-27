import { useEffect } from "react";
import { Spinner, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchFavoriteConventions,
  fetchFavoriteConventionsByUserId,
} from "../redux/actions/profileactions";

const UserFavorites = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const {
    favoriteConventions,
    loadingFavoriteConventions,
    errorFavoriteConventions,
    favoriteConventionsByUser,
    loadingFavoriteConventionsByUser,
    errorFavoriteConventionsByUser,
  } = useSelector((state) => state.users);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoriteConventionsByUserId(userId));
    } else {
      dispatch(fetchFavoriteConventions());
    }
  }, [dispatch, userId]);

  const loading = userId
    ? loadingFavoriteConventionsByUser
    : loadingFavoriteConventions;
  const error = userId
    ? errorFavoriteConventionsByUser
    : errorFavoriteConventions;

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const conventions = userId ? favoriteConventionsByUser : favoriteConventions;

  return (
    <Container>
      <Row className="justify-content-center mt-2">
        <Col className="col-11 col-sm-10 col-md-9 col-lg-6">
          <Card className="bg-info-subtle text-primary border-success border-4 shadow-lg p-4">
            <Card.Title>I miei eventi preferiti </Card.Title>
            <ul>
              {conventions.map((convention) => (
                <Card.Text
                  className="my-1 list-group-item "
                  key={convention.conventionId}
                >
                  <Link
                    to={`/convention/${convention.conventionId}`}
                    className="text-decoration-none"
                  >
                    {convention.title}
                  </Link>
                </Card.Text>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserFavorites;
