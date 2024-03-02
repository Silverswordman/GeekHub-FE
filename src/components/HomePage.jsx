import { Container, Row } from "react-bootstrap";
import HomeCard from "./ConventionCards";
import CustomHomeCarousel from "./HomeCarousel";

const Home = () => {
  return (
    <Container>
      <Row className="text-start mt-5 ms-5  ">
        <p className="text-info fw-bolder fst-italic fs-1 ">
          Prossimi Eventi in Arrivo!
        </p>
      </Row>
      <Row className="mb-5">
        <CustomHomeCarousel  />
      </Row>
      <Row>
        <HomeCard />
      </Row>
    </Container>
  );
};

export default Home;
