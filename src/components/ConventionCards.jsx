import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getConventions,
  searchConventions,
} from "../redux/actions/conventionactions";
import { fetchRegions } from "../redux/actions/locationactions";
import { Form, Spinner, Row, Col, Card, Pagination } from "react-bootstrap";
import { IoMdPin } from "react-icons/io";
import { FaSearchLocation } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

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

  const filterByRegion = (convention) => {
    if (!selectedRegion) return true;
    return convention.region.regionName === selectedRegion;
  };

  const filterBySearchTerm = (convention) => {
    if (!searchTerm) return true;
    return convention.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <>
      <Row className="d-flex justify-content-end mb-3">
        <Col className="col-12 col-sm-10  col-lg-4">
          <Row className="align-items-top">
            <Col className="col-1 ">
              <FaSearch className="text-white text-opacity-50 " />
            </Col>
            <Col className="col-11 ps-0">
              <Form.Control
                type="text"
                placeholder="Cerca eventi..."
                className="custom-placeholder border border-2 border-info bg-transparent text-white"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col className="col-12 col-sm-10 col-lg-4 ">
          <Row className="align-items-top">
            <Col className="col-1 ">
              <FaSearchLocation className="text-white text-opacity-50" />
            </Col>
            <Col className="col-9 ps-0">
              <Form.Select
                className="border border-2 border-info bg-transparent text-white "
                onChange={handleRegionChange}
                value={selectedRegion}
              >
                <option value="" className="text-black fw-bold">
                  In tutte le regioni
                </option>
                {regions.map((region) => (
                  <option
                    key={region.id}
                    value={region.regionName}
                    className="text-secondary"
                  >
                    {region.regionName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="mt-5 fadefromtop">
        {loading && <Spinner animation="grow" variant="info" />}
        {error && <div>Error: {error}</div>}
        {!loading &&
          !error &&
          conventions
            .filter(filterByRegion)
            .filter(filterBySearchTerm)
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
                  <Card className="p-1 bg-transparent bg-gradient border-info border-4 shadow-lg h-100 hover-scale">
                    <Row>
                      <Col className="col-12 col-md-9 col-lg-6">
                        <Card.Img
                          variant="top"
                          src={convention.coverImage}
                          className="bg-secondary border border-info border-4 rounded-start-5 rounded-top-5 bg-primary shadow w-100 mt-1 ms-1"
                        />
                      </Col>
                      <Col className="col-12 col-md-9 col-lg-6 ">
                        <Card.Body className="px-1 py-2  ">
                          <Row className="text-end">
                            <Col>
                              <Card.Img
                                variant="top"
                                src={convention.logo}
                                className="w-25 border border-info border-2 rounded-start-5 rounded-top-5 bg-success shadow-sm "
                              />
                            </Col>
                          </Row>
                          <Card.Title className="text-start text-wrap fw-bolder fst-italic text-white fs-4 my-1 ">
                            {convention.title}
                          </Card.Title>
                          <Card.Text className="text-white fw-medium mb-4">
                            <IoMdPin className="text-info fs-5 me-1" />
                            {convention.city.cityName},{" "}
                            {convention.region.regionName}
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
