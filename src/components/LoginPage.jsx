import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const bodyToUse = {
    email: email,
    password: password,
  };

  const serverLogin = () => {
    fetch("http://localhost:3003/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToUse),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore nel login");
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", "Bearer " + data.token);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
  }, []);

  return (
    <>
      <Container>
        <Row className="flex-column">
          <Col>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                serverLogin();
              }}
            >
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Scrivi qui la tua mail"
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              >
                <Form.Label className="text-danger ">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Inserisci la password"
                />
              </Form.Group>

              <Button variant="info" type="submit">
                Login
              </Button>
              <Button variant="danger">Registrati</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
