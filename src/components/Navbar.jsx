import { Container, Nav, Navbar, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavigationButtons from "./Buttons";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { BiSolidHomeAlt2 } from "react-icons/bi";

import { fetchProfile } from "../redux/actions/profileactions";
import logo from "../assets/logo.png";

const NavbarCustom = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const profileDetail = useSelector((state) => state.personalProfile);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Navbar
      expand="lg"
      className="bg-primary border border-bottom border-4 border-info sticky-top"
      fluid="true"
    >
      <Container className="m-0 text-white d-flex justify-content-between align-items-center">
        <Row className="w-25">
          <Col className="ms-5 d-none d-md-block  col-12 hover-scale pe-0">
            <Navbar.Brand
              as={Link}
              to="/"
              className="text-white me-0 text-center  "
            >
              <img src={logo} alt="GeekHub Logo" className=" align-top w-50" />
            </Navbar.Brand>
          </Col>
          <Col className=" d-md-none  hover-scale ">
            <Navbar.Brand
              as={Link}
              to="/"
              className="text-white me-0 text-center "
            >
              <img
                src={logo}
                alt="GeekHub Logo"
                className="align-top my-3"
                style={{ width: "150px" }}
              />
            </Navbar.Brand>
          </Col>
        </Row>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-info " />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            {isAuthenticated && (
              <>
                <Nav.Link
                  as={Link}
                  to="/home"
                  className="me-3 text-white align-items-center hover-scale fw-semibold"
                >
                  <BiSolidHomeAlt2 className="me-1 fs-4" />
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/users"
                  className="text-white align-items-center hover-scale "
                >
                  <HiMiniUsers className="me-1 fs-4" />
                  Utenti
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Nav.Link as={Link} to="/me" className="text-white hover-scale">
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
              <Nav.Link
                as={Link}
                to="/login"
                className="text-white hover-scale"
              >
                <FaUserCircle className="fs-5 me-1" />
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
