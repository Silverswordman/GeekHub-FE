import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationButtons from "./Buttons";
import logo from "../assets/logo.png";

const NavbarCustom = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
                My Profile
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-white">
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
