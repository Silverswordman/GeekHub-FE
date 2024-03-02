import { useState } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendRequest } from "../redux/actions/requestactions";

const RequestForm = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state.requests.error);

  const handleSendRequest = async () => {
    try {
      setLoading(true);
      await dispatch(sendRequest(message));
      setMessage("");
      setLoading(false);
    } catch (error) {
      console.error("Error sending request:", error);
      setLoading(false);
    }
  };

  return (
    <Container className="fadefromtop">
      <Card className="bg-transparent border border-4 border-info mt-5 p-4">
        {error && <div className="text-danger fs-5 fw-semibold ">{error}</div>}
        <Form>
          <Form.Group controlId="message">
            <Form.Label className="text-info fw-bold fs-5">
              Manda una richiesta per diventare un Event Planner!
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
            />
          </Form.Group>
          <Row>
            <Col className="text-end ">
              <Button
                className="btn-sm rounded-pill border border-4 border-white fw-semibold shadow-sm hover-scale mt-2"
                variant="info"
                onClick={handleSendRequest}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Request"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default RequestForm;
