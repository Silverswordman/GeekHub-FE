import { format } from "date-fns";
import { Col, Container, Row } from "react-bootstrap";

function PageFooter() {
  const currentDate = new Date();
  const currentYear = format(currentDate, "yyyy");

  return (
    <Container
      fluid
      className="border- text-center  bg-primary-subtle sticky-bottom"
    >
      <Row className="text-muted small fst-italic border-top border-5  border-info p-2">
        <Col>Geekhub by Silvestrini Giulia for Epicode {currentYear}</Col>
      </Row>
    </Container>
  );
}
export default PageFooter;
