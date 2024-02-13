import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/registeractions";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const RegistrationComponent = () => {
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const registerError = useSelector((state) => state.register.error);
  const userId = useSelector((state) => state.register.userId);
  const navigate = useNavigate(); // Usa useNavigate per la navigazione

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

  // Controlla se la registrazione è avvenuta con successo
  if (userId) {
    navigate("/login"); // Reindirizza alla pagina di login se la registrazione è avvenuta con successo
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="surname">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          type="text"
          name="surname"
          value={userData.surname}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
      {registerError && <p className="text-danger">{registerError}</p>}
    </Form>
  );
};

export default RegistrationComponent;
