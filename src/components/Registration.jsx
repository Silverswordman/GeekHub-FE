import { useState } from "react";
import { Button, Form, Card, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/registeractions";
import { useNavigate } from "react-router-dom";
import { IoEyeOff, IoEye } from "react-icons/io5";

const RegistrationComponent = () => {
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const registerError = useSelector((state) => state.register.error);
  const userId = useSelector((state) => state.register.userId);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await dispatch(registerUser(userData));
  };

  const validateForm = () => {
    if (
      !userData.username ||
      !userData.name ||
      !userData.surname ||
      !userData.email ||
      !userData.password
    ) {
      alert("Compila tutti i campi!");
      return false;
    }

    if (userData.password.length < 5) {
      alert("La password deve essere lunga almeno 5 caratteri!");
      return false;
    }

    return true;
  };

  if (userId) {
    navigate("/login");
  }

  return (
    <Container>
      <Card className="bg-transparent border border-4 border-info mt-5 p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
          <Row>
              <Col className="col-11 pe-0">
            <Form.Label className="text-info fw-bold">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="mb-2"
              placeholder="Inserisci qui il tuo username"
            />
             </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="name">
            <Row>
              <Col className="col-11 pe-0">
                <Form.Label className="text-info fw-bold">Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Inserisci qui il tuo nome"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="surname">
            <Row>
              <Col className="col-11 pe-0">
                <Form.Label className="text-info fw-bold">Cognome</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  value={userData.surname}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Inserisci qui il tuo cognome"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="email">
            <Row>
              <Col className="col-11 pe-0">
                <Form.Label className="text-info fw-bold">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Inserisci qui la tua mail"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="text-info fw-bold">Password</Form.Label>
            <Row className="input-group align-content-center ">
              <Col className="col-11 pe-0">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="mb-2"
                  placeholder="Inserisci qui la tua password"
                />
              </Col>
              <Col className="col-1 p-0">
                <Button
                  className=" text-white border-2 btn-outline-info  "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEye /> : <IoEyeOff />}
                </Button>
              </Col>
            </Row>
          </Form.Group>
          <Row className="">
            <Col>
              <Button
                variant="success"
                className="rounded-pill border border-4 border-info fw-bold shadow-sm my-4"
                type="submit"
              >
                Registrati
              </Button>
              {registerError && (
                <p className="text-danger ms-5 my-3 fs-5">{registerError}</p>
              )}
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default RegistrationComponent;
