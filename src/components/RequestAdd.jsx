import React, { useState, useEffect } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../redux/actions/requestactions";

const RequestForm = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [requestError, setRequestError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    try {
      setLoading(true);
      await dispatch(sendRequest(message));
      setMessage("");
      setRequestError("");
      setLoading(false);
    } catch (error) {
      console.error("Errore nell'invio della richiesta:", error);
      if (error && error.response && error.response.status === 500) {
        setRequestError("Hai già inviato una richiesta.");
      } else {
        setRequestError(
          error.message || "Si è verificato un errore durante l'invio della richiesta. Riprova più tardi."
        );
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Stato dell'errore:", requestError);
    if (requestError) {
      setTimeout(() => {
        setRequestError("");
      }, 3000);
    }
  }, [requestError]);

  return (
    <Container>
      <Card className="bg-transparent border border-4 border-info mt-5 p-4">
        {requestError && <div className="text-danger">{requestError}</div>}
        <Form>
          <Form.Group controlId="message">
            <Form.Label className="text-info fw-bold fs-5">
              Vuoi poter inserire nuovi eventi nel sito?
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Inserisci qui il tuo messaggio per chiedere di diventare un organizzatore di eventi..."
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleSendRequest}
            disabled={loading}
          >
            {loading ? "Invio in corso..." : "Invia la richiesta"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default RequestForm;
