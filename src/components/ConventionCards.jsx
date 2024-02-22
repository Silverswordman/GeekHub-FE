import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getConventions,
  searchConventions,
} from "../redux/actions/conventionactions";
import { fetchRegions } from "../redux/actions/locationactions";
import { Form, Spinner, Row, Col, Card, Pagination } from "react-bootstrap";

const HomeCard = () => {
  const dispatch = useDispatch();
  const { conventions, loading, error, totalPages, currentPage } = useSelector(
    (state) => state.conventions
  );
  const regions = useSelector((state) => state.location.regions);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchRegions());

    dispatch(getConventions(currentPage, selectedRegion));
  }, [dispatch, currentPage, selectedRegion]);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    dispatch(searchConventions(value));
  };

  const handlePageChange = (page) => {
    dispatch(getConventions(page - 1, selectedRegion));
  };

  return (
    <>
      <Row className="d-flex justify-content-end mb-3">
        <Col className="col-12 col-sm-7 col-md-4">
          <Form.Control
            type="text"
            placeholder="Search by title..."
            className="custom-placeholder border border-2 border-info bg-transparent text-white"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Col>
        <Col className="col-12 col-sm-7 col-md-4 col-lg-3">
          <Form.Select
            className="border border-2 border-info bg-transparent text-white"
            onChange={handleRegionChange}
            value={selectedRegion}
          >
            <option value="" className=" text-black fw-bold ">
              All Regions
            </option>
            {regions.map((region) => (
              <option
                key={region.id}
                value={region.regionName}
                className=" text-secondary"
              >
                {region.regionName}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="mt-5">
        {loading && <Spinner animation="grow" variant="info" />}
        {error && <div>Error: {error}</div>}
        {!loading &&
          !error &&
          conventions
            .filter(
              (convention) =>
                !selectedRegion ||
                convention.region.regionName === selectedRegion
            )
            .filter((convention) =>
              convention.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((convention) => (
              <Col
                key={convention.conventionId}
                md={5}
                sm={6}
                xs={12}
                className="pt-3"
              >
                <Link
                  to={`/convention/${convention.conventionId}`}
                  className="text-decoration-none"
                >
                  <Card className="p-1 bg-primary bg-gradient border-info border-4 shadow-lg h-100">
                    <Row>
                      <Col className="col-12 col-md-9 col-lg-6">
                        <Card.Img
                          variant="top"
                          fluid
                          src={convention.coverImage}
                          className="border border-info border-4 rounded-start-5 rounded-top-5 bg-primary shadow"
                        />
                      </Col>
                      <Col className="col-12 col-md-9 col-lg-6">
                        <Card.Body className="px-1 py-2 m-1">
                          <Row className="text-end">
                            <Col>
                              <Card.Img
                                variant="top"
                                fluid
                                src={convention.logo}
                                className="w-25 border border-info border-2 rounded-start-5 rounded-top-5 bg-success shadow-sm"
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
                          <Card.Text className="text-white fw-medium m-0">
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
                    className="border border-1 border-info shadow-sm fw-bolder"
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
