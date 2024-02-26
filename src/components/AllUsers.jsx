import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Importa Link
import { fetchUsers } from "../redux/actions/profileactions";
import { setCurrentPage } from "../redux/actions/profileactions";
import { Button, Row, Col, Spinner, Card } from "react-bootstrap";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);
  const pageSize = 15;
  const order = "username";

  useEffect(() => {
    dispatch(fetchUsers(currentPage, pageSize, order));
  }, [dispatch, currentPage, pageSize, order]);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="grow" variant="info" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-white fs-2">Utenti non disponibili in questo momento.</p>
    );
  }

  return (
    <>
      <Row className="my-2 w-100 justify-content-center">
        {Array.isArray(users) &&
          users.map((user) => (
            <Col
              key={user.userId}
              className="m-3 col-11 col-sm-8 col-md-4 col-lg-3 h-100"
            >
              {/* Utilizza Link per reindirizzare al profilo dell'utente */}
              <Link to={`/users/${user.userId}`}>
                <Card className="bg-info-subtle text-primary border-success border-4 shadow-lg p-4">
                  <Card.Img
                    src={user.avatar}
                    className="w-25 rounded-pill border border-4 border-primary"
                  ></Card.Img>
                  <Card.Text>Name: {user.name}</Card.Text>
                  <Card.Text>Surname: {user.surname}</Card.Text>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
      <Row className="text-center">
        <Col>
          <Button onClick={prevPage} disabled={currentPage === 0}>
            Previous Page
          </Button>
          <Button onClick={nextPage} disabled={currentPage === totalPages - 1}>
            Next Page
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default UserList;
