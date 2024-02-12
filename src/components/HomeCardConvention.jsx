import { Card, Pagination, Spinner, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConventions } from "../redux/actions/conventionactions";

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
        {loading && <Spinner animation="border" />}
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
              <Card className="p-1">
                <Card.Img variant="top" src={convention.coverImage}  />
                <Card.Body>
                  <Card.Title>{convention.title}</Card.Title>
                  <Card.Title>{convention.title}</Card.Title>
                  <Card.Text>{convention.city.cityName}</Card.Text>
                  <Card.Text>{convention.address}</Card.Text>
                </Card.Body>
              </Card>
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
