import { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { saveNewSubsection } from "../redux/actions/conventionactions";
import { useParams, useNavigate } from "react-router-dom";

const AddSubsection = () => {
  const { conventionId, sectionId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [subsectionData, setSubsectionData] = useState({
    subsectionTitle: "",
    subsectionDescription: "",
    subsectionTime: "",
    sectionTitle: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubsectionData({ ...subsectionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!conventionId || !sectionId) {
      console.error("ID della convenzione o della sezione non validi");
      return;
    }

    const formData = {
      subsectionTitle: subsectionData.subsectionTitle,
      subsectionDescription: subsectionData.subsectionDescription,
      subsectionTime: subsectionData.subsectionTime,
      sectionTitle: subsectionData.sectionTitle,
    };

    try {
      await dispatch(saveNewSubsection(conventionId, sectionId, formData));
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate(`/conventions/${conventionId}/sec/${sectionId}`);
      }, 1500);
    } catch (error) {
      console.error("Errore durante la creazione della sottosezione:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col className="col-11 col-md-8">
          <Card className="p-4 bg-primary-subtle">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="subsectionTitle">
                <Form.Label className="fw-bolder">Subsection Title</Form.Label>
                <Form.Control
                  type="text"
                  name="subsectionTitle"
                  value={subsectionData.subsectionTitle}
                  onChange={handleChange}
                  placeholder="Titolo della sottosezione"
                />
              </Form.Group>
              <Form.Group controlId="subsectionDescription">
                <Form.Label className="fw-bolder">
                  Subsection Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="subsectionDescription"
                  value={subsectionData.subsectionDescription}
                  onChange={handleChange}
                  placeholder="Descrizione della sottosezione"
                />
              </Form.Group>
              <Form.Group controlId="subsectionTime">
                <Form.Label className="fw-bolder">Subsection Time</Form.Label>
                <Form.Control
                  type="text"
                  name="subsectionTime"
                  value={subsectionData.subsectionTime}
                  onChange={handleChange}
                  placeholder="Tempo della sottosezione"
                />
              </Form.Group>
              <Button
                className="bg-info text-primary fw-bolder border border-3 border-primary-subtle mt-3"
                type="submit"
              >
                Add Subsection
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
      {showSuccessMessage && (
        <Row className="justify-content-center">
          <Col className="col-6">
            <Alert
              variant="info"
              className="mt-3 border-primary fw-bolder fst-italic"
            >
              Sottosezione creata correttamente
            </Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AddSubsection;
