import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { Container } from "react-bootstrap";
import { getConventions } from "../redux/actions/conventionactions";

const CustomHomeCarousel = () => {
  const dispatch = useDispatch();
  const { conventions } = useSelector((state) => state.conventions);

  useEffect(() => {
    dispatch(getConventions(0, 3));
  }, [dispatch]);

  return (
    <Container>
      <Carousel data-bs-theme="dark">
        {conventions.slice(0, 3).map((convention) => (
          <Carousel.Item key={convention.conventionId}>
            <img
              className="d-block w-100"
              src={convention.coverImage}
              alt={convention.title}
            />
            <Carousel.Caption>
              <h5>{convention.title}</h5>
              <p>{convention.city.cityName}</p>
              <p>{convention.address}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default CustomHomeCarousel;
