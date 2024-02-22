import { format } from "date-fns";
import { Col, Container, Row } from "react-bootstrap";
import { FaLinkedin } from "react-icons/fa";

function PageFooter() {
  const currentDate = new Date();
  const currentYear = format(currentDate, "yyyy");

  return (
    <Container fluid className=" text-center   bg-primary sticky-bottom">
      <Row className="text-info small fst-italic border-top border-5  border-info p-2">
        <Col>Geekhub by Silvestrini Giulia for Epicode {currentYear}</Col>
        <Col>
          <FaLinkedin className="fs-5"/>
        </Col>
      </Row>
    </Container>
  );
}
export default PageFooter;
