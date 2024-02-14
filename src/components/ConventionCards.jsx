import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getConventions } from "../redux/actions/conventionactions";
import { Card, Col, Row, Spinner, Pagination } from "react-bootstrap";

const HomeCard = () => {
  const dispatch = useDispatch();
  const { conventions, loading, error, totalPages, currentPage } = useSelector(
    (state) => state.conventions
  );

  useEffect(() => {
    dispatch(getConventions(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(getConventions(page - 1));
  };

  return (
    <>
      <Row xs={1} md={2} lg={3}>
        {loading && <Spinner animation="grow" variant="info" />}
        {error && <div>Error: {error}</div>}
        {!loading &&
          !error &&
          conventions.map((convention) => (
            <Col
              key={convention.conventionId}
              md={4}
              sm={6}
              xs={12}
              className="pt-3"
            >
              <Link
                to={`/convention/${convention.conventionId}`}
                className="text-decoration-none"
              >
                <Card className="p-1 bg-primary-subtle border-info border-4 shadow-lg">
                  <Row>
                    <Col className="col-6">
                      <Card.Img variant="top" src={convention.coverImage} />
                    </Col>

                    <Col className="col-6">
                      <Card.Body>
                        <Card.Title>{convention.title}</Card.Title>
                        <Card.Text>{convention.city.cityName}</Card.Text>
                        <Card.Text>{convention.address}</Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
      {!loading && !error && totalPages > 0 && (
        <Row>
          <Col>
            <Pagination className="justify-content-center mt-5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage + 1}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Pagination.Item>
                )
              )}
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
};

export default HomeCard;
