import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getConventions } from "../redux/actions/conventionactions";
import { Card, Col, Row, Spinner, Pagination } from "react-bootstrap";
import { LuArrowBigLeftDash, LuArrowBigRightDash } from "react-icons/lu";

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
      <Row xs={1} md={2} lg={3} className="mt-5">
        {loading && <Spinner animation="grow" variant="info" />}
        {error && <div>Error: {error}</div>}
        {!loading &&
          !error &&
          conventions.map((convention) => (
            <Col
              key={convention.conventionId}
              md={5}
              sm={6}
              xs={12}
              className="pt-3 "
            >
              <Link
                to={`/convention/${convention.conventionId}`}
                className="text-decoration-none"
              >
                <Card className="p-1 bg-primary bg-gradient border-info border-4 shadow-lg h-100">
                  <Row>
                    <Col className="col-12  col-md-9 col-lg-6 ">
                      <Card.Img
                        variant="top"
                        fluid
                        src={convention.coverImage}
                        className=" border border-info border-4 rounded-start-5 rounded-top-5 bg-primary shadow"
                      />
                    </Col>

                    <Col className="col-12 col-md-9 col-lg-6 ">
                      <Card.Body className="p-0 m-1">
                        <Row className="text-end">
                          <Col>
                            <Card.Img
                              variant="top"
                              fluid
                              src={convention.logo}
                              className=" w-25 border border-info border-2 rounded-start-5 rounded-top-5 bg-success shadow-sm"
                            />
                          </Col>
                        </Row>
                        <Card.Title className="text-start text-wrap fw-bolder fst-italic text-white fs-4">
                          {convention.title}
                        </Card.Title>
                        <Card.Text className="text-white fw-medium m-0">
                          {convention.city.cityName},{" "}
                          {convention.region.regionName}
                        </Card.Text>
                        <Card.Text className="text-white fw-medium  m-0">
                          {convention.address}
                        </Card.Text>
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
                    className="border border-1 border-info shadow-sm fw-bolder "
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
