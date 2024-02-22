import { Container, Nav, Navbar, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavigationButtons from "./Buttons";
import { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";

import { fetchProfile } from "../redux/actions/profileactions";
import logo from "../assets/logo.png";

const NavbarCustom = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const profileDetail = useSelector((state) => state.personalProfile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <Navbar
      expand="lg"
      className="bg-primary border border-bottom border-4 border-info"
      fluid="true"
    >
      <Container className="m-0 text-white d-flex justify-content-between align-items-center">
        <Navbar.Brand
          as={Link}
          to="/home"
          className="text-white flex-grow-0 text-center"
        >
          <img
            src={logo}
            alt="GeekHub Logo"
            className="d-inline-block align-top w-25"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-info " />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" className="text-white">
              Home
            </Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Nav.Link as={Link} to="/me" className="text-white">
                {profileDetail.profile && (
                  <Row className="m-0 align-items-center">
                    <Col className="col-3 text-end ">
                      <Image
                        src={profileDetail.profile.avatar}
                        alt="Profile Image"
                        width={35}
                        height={35}
                        roundedCircle
                        className="border border-2 border-info "
                      />
                    </Col>
                    <Col>
                      <p className="fw-bolder m-0">
                        Benvenut* {profileDetail.profile.username}!
                      </p>
                    </Col>
                  </Row>
                )}
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-white">
                <FaRegUserCircle />
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <NavigationButtons />
    </Navbar>
  );
};

export default NavbarCustom;
