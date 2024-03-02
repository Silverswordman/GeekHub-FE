import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getConventions } from "../redux/actions/conventionactions";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import it from "date-fns/locale/it";
import { IoMdPin } from "react-icons/io";

const CustomHomeCarousel = () => {
  const dispatch = useDispatch();
  const { conventions } = useSelector((state) => state.conventions);

  useEffect(() => {
    dispatch(getConventions(0, 4));
  }, [dispatch]);

  const sortedConventions = conventions
    .slice(0, 5)
    .filter((convention) => convention.startDate)
    .sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);

      const currentDate = new Date();

      const diffA = Math.abs(dateA - currentDate);
      const diffB = Math.abs(dateB - currentDate);

      return diffA - diffB;
    });

  return (
    <Container className="mt-1 bg-gradient rounded-pill fadefromleft">
      {sortedConventions.length > 0 && (
        <Carousel data-bs-theme="light">
          {sortedConventions.map((convention) => (
            <Carousel.Item key={convention.conventionId} className="mb-5">
              <Link
                to={`/convention/${convention.conventionId}`}
                className="text-decoration-none"
              >
                <Container>
                  <Row className="px-md-5">
                    <h2 className="text-center fw-bolder fst-italic text-white my-4 ">
                      {" "}
                      <span className="fst-italic fw-lighter">Dal</span>{" "}
                      {format(new Date(convention.startDate), "dd MMMM yyyy", {
                        locale: it,
                      })}{" "}
                      <span className="fst-italic fw-lighter">Al</span>{" "}
                      {format(new Date(convention.endDate), " dd MMMM yyyy", {
                        locale: it,
                      })}
                    </h2>
                    <Col className="ms-md-5">
                      <div
                        className=" border border-info border-4 rounded-end-5 rounded-top-5 bg-primary "
                        style={{
                          width: "450px",
                          height: "350px",
                          backgroundImage: `url(${convention.coverImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    </Col>
                    <Col>
                      <Card className="bg-transparent border-0">
                        <Card.Text className="text-info fs-1 fw-bold fst-italic shadow-sm hover-scale">
                          {convention.title}
                        </Card.Text>
                        <Card.Text className="text-white fs-4 fw-bold fst-italic">
                          <IoMdPin className="me-1"></IoMdPin>
                          {convention.city.cityName} ,{" "}
                          {convention.region.regionName}
                        </Card.Text>
                        <Card.Text className="text-white">
                          {convention.address}
                        </Card.Text>
                        <Row className="text-end me-1 me-md-5">
                          <Col>
                            <Card.Img
                              variant="bottom"
                              src={convention.logo}
                              className="w-25 border border-info border-2 rounded-start-5 rounded-top-5 bg-success  "
                            />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </Container>
  );
};

export default CustomHomeCarousel;
