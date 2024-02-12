
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarCustom = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Navbar expand="lg" className="bg-primary-subtle" fluid="true">
      <Container className=" m-0">
        <Navbar.Brand as={Link} to="/home">
          Geekhub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated ? (
              <Nav.Link as={Link} to="/me">
                My Profile
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCustom;
