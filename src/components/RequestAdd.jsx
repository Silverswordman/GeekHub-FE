import  { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendRequest } from "../redux/actions/requestactions";

const RequestForm = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendRequest(message));
    setMessage("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="message">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Send Request
      </Button>
    </Form>
  );
};

export default RequestForm;
