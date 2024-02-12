import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const NavbarCustom = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-primary-subtle" fluid="true">
      <Container className=" m-0">
        <Navbar.Brand
          onClick={() => {
            navigate("/home");
          }}
        >
          Geekhub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link href="#link"></Nav.Link>
            <Nav.Link href="#link">My Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCustom;
