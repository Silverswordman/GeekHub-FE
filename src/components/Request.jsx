import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRequests } from "../redux/actions/requestactions";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";

const RequestsList = () => {
  const dispatch = useDispatch();
  const { requests, loading, error, totalPages, currentPage } = useSelector(
    (state) => state.requests
  );
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchRequests(page, 10));
  }, [dispatch, page]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <Spinner animation="grow" className="text-primary" size="sm" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!requests || requests.length === 0) {
    return (
      <Row className="justify-content-center">
        <Col className="col-7 text-primary fs-3 bg-info-subtle mt-5 m-1">
          Nessuna richiesta di accesso come organizzatore in arrivo
        </Col>
      </Row>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h1>Requests List</h1>

          {requests.map((request) => (
            <Card.Text key={request.requestId}>
              <p>{request.message}</p>
            </Card.Text>
          ))}

          <Row className="justify-content.center">
            <Col className="text-end">
              <Button
                variant="primary"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
            </Col>
            <Col className="text-start">
              <Button
                variant="primary"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RequestsList;
