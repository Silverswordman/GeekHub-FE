import { format } from "date-fns";
import { Col, Container, Row } from "react-bootstrap";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function PageFooter() {
  const currentDate = new Date();
  const currentYear = format(currentDate, "yyyy");

  return (
    <Container fluid className="text-center bg-primary sticky-bottom">
      <Row className="text-info small fst-italic border-top border-5 border-info p-2">
        <Col>Geekhub by Silvestrini Giulia for Epicode {currentYear}</Col>
        <Col>
          <a
            href="https://www.linkedin.com/in/giulia-silvestrini-943a2b1b5/"
            target="_blank"
            rel="noopener noreferrer"
            className="fs-5 mx-3"
          >
            <FaLinkedin className="text-info" />
          </a>
          <a
            href="https://github.com/Silverswordman"
            target="_blank"
            rel="noopener noreferrer"
            className="fs-5"
          >
            <FaGithub className="text-info" />
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default PageFooter;
