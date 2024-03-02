import { useEffect } from "react";
import { Spinner, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchFavoriteConventions,
  fetchFavoriteConventionsByUserId,
} from "../redux/actions/profileactions";
import { BsHearts } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

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
    <Container >
      <Row className="justify-content-center mt-2">
        <Col className="col-11 col-sm-10 col-md-9 col-lg-6 px-1">
          <Card className="bg-transparent bg-gradient text-white border-success-subtle border-4 shadow-lg p-4">
            <Row className="text-center">
              <Col className="col-1">
                <BsHearts className="fs-3" />
              </Col>
              <Col>
                <h2 className="fs-3 fw-semibold text-info fst-italic">
                  I miei eventi preferiti{" "}
                </h2>
              </Col>
              <Col className="col-1">
                <BsHearts className="fs-3" />
              </Col>
            </Row>
            <ul className="fadefromleft">
              {conventions.map((convention) => (
                <Card.Text
                  className=" hover-scale my-1 mx-2 list-group-item px-2 py-1  bg-secondary  rounded-pill "
                  key={convention.conventionId}
                >
                  <FaHeart className=" me-3 text-info" />
                  <Link
                    to={`/convention/${convention.conventionId}`}
                    className="text-decoration-none text-white "
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
