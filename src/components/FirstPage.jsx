import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import { useEffect } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FirstPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 ">
      <Row>
        <Col className="col-10 col-md-6 d-flex flex-column align-items-center justify-content-center position-relative fadefromleft">
          <Image src={logo} alt="GeekHub Logo" className="w-100 z-1" />
          <Image
            src={logo}
            alt="GeekHub Logo"
            className="w-100 opacity-25 position-absolute bottom-0 end-0 z-0"
            style={{ transform: "translate(5%, 10%)" }}
          />
        </Col>
        <Col className="col-10 col-md-6 d-flex align-items-center justify-content-center fadefromleft">
          <Card className="bg-transparent text-white ">
            <Card.Body className="pb-1">
              <Card.Title className="fs-2 fw-semibold fst-italic">
                Welcome!
              </Card.Title>
              <Card.Text className="fs-5 ">
                Esplora GeekHub e scopri le fiere italiane dedicate al mondo
                geek! Trova l'evento perfetto per immergerti nelle emozioni
                straordinarie delle tue passioni preferite.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="pb-0">
              <Row>
                {!isAuthenticated && (
                  <>
                    <Col className="text-end">
                      <Button
                        variant="light"
                        onClick={() => navigate("/login")}
                        className="rounded-pill border border-4 border-info fw-semibold shadow-sm  me-4 hover-scale"
                      >
                        Login
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="primary"
                        onClick={() => navigate("/register")}
                        className="rounded-pill border border-4 border-info fw-semibold shadow-sm hover-scale"
                      >
                        Registrati
                      </Button>
                    </Col>{" "}
                  </>
                )}
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FirstPage;
