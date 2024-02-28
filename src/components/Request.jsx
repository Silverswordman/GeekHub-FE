import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRequests,
  acceptRequest,
  declineRequest,
} from "../redux/actions/requestactions";
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

  const handleAcceptRequest = (requestId) => {
    dispatch(acceptRequest(requestId)).then(() => {
      dispatch(fetchRequests(page, 10)); // Ricarica la lista delle richieste dopo l'accettazione
    });
  };

  const handleDeclineRequest = (requestId) => {
    dispatch(declineRequest(requestId)).then(() => {
      dispatch(fetchRequests(page, 10)); // Ricarica la lista delle richieste dopo il rifiuto
    });
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
    <Container>
      <Row className="mt-3 justify-content-center">
        <Card className="col-7 text-primary fs-3 bg-info-subtle oorder border-4 border-success mt-5 m-1">
          <Card.Body>
            <Card.Title className="fs-3 fw-semibold fst-italic">
              Lista Richieste
            </Card.Title>

            {requests.map((request) => (
              <Card.Text className="text-start " key={request.requestId}>
                <li className=" fs-5">
                  L'utente <span className="fw-bold">{request.name} </span> con
                  la mail <span className="fw-bold">{request.email} </span>{" "}
                  invia questo messaggio per esser accettat* come event planner:
                  
                  <span className="fw-bold fst-italic">
                    {" "}
                    {request.message}{" "}
                  </span>
                  
                </li>
                <Row className="text-end">
                  <Col>
                    <Button
                      className="btn-sm rounded-pill border border-4 border-info fw-bold shadow-sm "
                      variant="success"
                      onClick={() => handleAcceptRequest(request.requestId)}
                    >
                      Accetta
                    </Button>
                    <Button
                      className="btn-sm rounded-pill border border-4 border-info fw-bold shadow-sm "
                      variant="danger"
                      onClick={() => handleDeclineRequest(request.requestId)}
                    >
                      Rifiuta
                    </Button>
                  </Col>
                </Row>
              </Card.Text>
            ))}

            <Row className="justify-content-center">
              <Col className="text-end">
                <Button
                  variant="primary"
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="btn btn-small"
                >
                  Previous
                </Button>
              </Col>
              <Col className="text-start">
                <Button
                  variant="primary"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="btn btn-small"
                >
                  Next
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default RequestsList;
