import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { Container, Card, Row, Col } from "react-bootstrap";
import { getConventions } from "../redux/actions/conventionactions";
import { Link } from "react-router-dom";

const CustomHomeCarousel = () => {
  const dispatch = useDispatch();
  const { conventions } = useSelector((state) => state.conventions);

  useEffect(() => {
    dispatch(getConventions(0, 4));
  }, [dispatch]);

  const sortedConventions = conventions.slice(0, 5).sort((a, b) => {
    const dateA = new Date(a.localDateTime);
    const dateB = new Date(b.localDateTime);
    const currentDate = new Date();

    const diffA = Math.abs(dateA - currentDate);
    const diffB = Math.abs(dateB - currentDate);

    return diffA - diffB;
  });

  sortedConventions.reverse();

  return (
    <Container className="mt-5">
      {sortedConventions.length > 0 && (
        <Carousel data-bs-theme="light">
          {sortedConventions.map((convention) => (
            <Carousel.Item key={convention.conventionId}>
              <Link
                to={`/convention/${convention.conventionId}`}
                className="text-decoration-none"
              >
                <Row>
                  <Col>
                    <div
                      className=" border border-4 border-info"
                      style={{
                        width: "400px",
                        height: "300px",
                        backgroundImage: `url(${convention.coverImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </Col>
                  <Col>
                    <h5 className="text-info">{convention.title}</h5>
                    <p className="text-white">{convention.city.cityName} </p>
                    <p className="text-white">{convention.address}</p>
                  </Col>
                </Row>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </Container>
  );
};

export default CustomHomeCarousel;
