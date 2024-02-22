import { Container, Row } from "react-bootstrap";
import HomeCard from "./ConventionCards";
import CustomHomeCarousel from "./HomeCarousel";

const Home = () => {
  return (
    <Container>
      <Row className="mb-5"><CustomHomeCarousel /></Row>
      <Row>
        <HomeCard  />
      </Row>
    </Container>
  );
};

export default Home;
