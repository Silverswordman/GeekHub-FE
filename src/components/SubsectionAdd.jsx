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
    <Container className="fadefromleft">
      <Row className="justify-content-center mt-4">
        <Col className="col-11 col-md-8">
          <Card className="p-4 bg-primary-subtle">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="subsectionTitle">
                <Form.Label className="fw-bolder">Titolo</Form.Label>
                <Form.Control
                  type="text"
                  name="subsectionTitle"
                  value={subsectionData.subsectionTitle}
                  onChange={handleChange}
                  placeholder="Inserisci qui il titolo di quest'evento o servizio o simili"
                />
              </Form.Group>
              <Form.Group controlId="subsectionDescription">
                <Form.Label className="fw-bolder">Descrizione </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="subsectionDescription"
                  value={subsectionData.subsectionDescription}
                  onChange={handleChange}
                  placeholder="Qui puoi descrivere più accuratamente tutto ciò che comporta quest'evento o servizio della fiera esempio:Torneo di FIFA, Sfilata Cosplay, Incontro Autore ecc..."
                />
              </Form.Group>
              <Form.Group controlId="subsectionTime">
                <Form.Label className="fw-bolder">
                  Orario (non obbligatorio)
                </Form.Label>
                <Form.Control
                  type="text"
                  name="subsectionTime"
                  value={subsectionData.subsectionTime}
                  onChange={handleChange}
                  placeholder="Che sia tutta la giornata o un orario preciso scrivilo qui !"
                />
              </Form.Group>
              <Button
                className=" hover-scale bg-info text-primary fw-bolder border border-3 border-primary-subtle mt-3 "
                type="submit"
              >
                Sezione salvata
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
              Sezione creata correttamente{" "}
            </Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AddSubsection;
