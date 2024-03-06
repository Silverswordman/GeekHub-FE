import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authactions";
import { IoEyeOff, IoEye } from "react-icons/io5";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loginError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);


  

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <Container className="fadefromleft">
      <Row className="flex-column">
        <Col>
          <Card className="bg-transparent border border-4 border-info mt-5 p-2 p-md-5 pe-md-4">
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Row>
                  <Col className="col-11 fle pe-0">
                    <Form.Label className="text-info fw-bold">
                      Email{" "}
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Inserisci qui la tua Email con cui ti sei registrato"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mb-3"
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="text-info fw-bold">Password</Form.Label>
                <Row className="input-group align-content-center">
                  <Col className="col-10 pe-0 flex-grow-1 ">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Inserisci qui la tua password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                  <Col className="col-1 p-0 ">
                    <Button
                      className="text-white border-2 btn-outline-info "
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <IoEye /> : <IoEyeOff />}
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
              <Row className="text-end me-5">
                <Col>
                  <Button
                    onClick={() => navigate("/register")}
                    variant="light"
                    className="rounded-pill border border-4 border-info fw-bold shadow-sm my-4  me-4 hover-scale"
                  >
                    Registrati
                  </Button>
                  <Button
                    variant="success"
                    className="rounded-pill border border-4 border-info fw-bold shadow-sm my-4 hover-scale"
                    type="submit"
                  >
                    Login
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
          {loginError && (
            <Card className="my-3">
              <Card.Body className="bg-danger-subtle">
                <Card.Text>
                  User non riconosciuto. Vuoi registrarti?{" "}
                  <Button onClick={() => navigate("/register")}>
                    Registrati
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
