import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authactions";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loginError = useSelector((state) => state.auth.error);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  if (isAuthenticated && !loginError) {
    navigate("/home");
  }

  return (
    <Container>
      <Row className="flex-column">
        <Col>
          {!isAuthenticated ? (
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button onClick={() => navigate("/register")}>Register</Button>
            </Form>
          ) : (
            <p>Sei già autenticato!</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;

