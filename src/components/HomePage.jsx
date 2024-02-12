import { Container, Row } from "react-bootstrap";
import HomeCard from "./HomeCardConvention";
import CustomHomeCarousel from "./HomeCarousel";

const Home = () => {
  return (
    <Container>
      <Row>
        <CustomHomeCarousel/>
      </Row>
      <Row>
        <HomeCard />
      </Row>
    </Container>
  );
};

export default Home;
