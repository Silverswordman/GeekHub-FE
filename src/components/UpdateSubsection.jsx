import  { useState, useEffect } from "react";
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateSubsection } from "../redux/actions/update&deleteactions";
import { useParams, useNavigate } from "react-router-dom";

const UpdateSubsectionForm = () => {
  const { conventionId, sectionId, subsectionId } = useParams();
  const dispatch = useDispatch();

  const subsectionDataFromRedux = useSelector((state) =>
    state.subsections.subsections.content.find(
      (subsection) => subsection.subsectionId === Number(subsectionId)
    )
  );

  const [subsectionData, setSubsectionData] = useState({
    subsectionTitle: "",
    subsectionDescription: "",
    subsectionTime: "",
  });

  useEffect(() => {
    if (subsectionDataFromRedux) {
      setSubsectionData(subsectionDataFromRedux);
    }
  }, [subsectionDataFromRedux]);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubsectionData({ ...subsectionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!conventionId || !sectionId || !subsectionId) {
      console.error("ID della convenzione, sezione o sottosezione non validi");
      return;
    }

    try {
      await dispatch(
        updateSubsection(conventionId, sectionId, subsectionId, subsectionData)
      );
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate(`/conventions/${conventionId}/sec/${sectionId}`);
      }, 1200);
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento della sottosezione:",
        error
      );
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col className="col-11 col-md-8">
          <Card className="p-4 bg-primary-subtle">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="subsectionTitle">
                <Form.Label className="fw-bolder">Nuovo Titolo</Form.Label>
                <Form.Control
                  type="text"
                  name="subsectionTitle"
                  value={subsectionData.subsectionTitle || ""}
                  onChange={handleChange}
                  placeholder="Titolo della sottosezione"
                />
              </Form.Group>
              <Form.Group controlId="subsectionDescription">
                <Form.Label className="fw-bolder">
Inserisci qui la nuova descrizione del tuo evento e/o servizio                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="subsectionDescription"
                  value={subsectionData.subsectionDescription || ""}
                  onChange={handleChange}
                  placeholder="Descrizione della sottosezione"
                />
              </Form.Group>
              <Form.Group controlId="subsectionTime">
                <Form.Label className="fw-bolder">Orario</Form.Label>
                <Form.Control
                  type="text"
                  name="subsectionTime"
                  value={subsectionData.subsectionTime || ""}
                  onChange={handleChange}
                  placeholder="Puoi modificare qui l'orario"
                />
              </Form.Group>
              <Button
                className="bg-info text-primary fw-bolder border border-3 border-primary-subtle mt-3 hover-scale"
                type="submit"
              >
               Conferma modifiche
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
              Modifiche aggiornate correttamente
            </Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UpdateSubsectionForm;
