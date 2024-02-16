import { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Row,
  Col,
  Container,
  Card,
  
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { saveNewSection } from "../redux/actions/conventionactions";
import { useParams, useNavigate } from "react-router-dom";

const AddSection = () => {
  const { conventionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sectionData, setSectionData] = useState({
    sectionTitle: "",
    sectionSubtitle: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionData({ ...sectionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!conventionId) {
      console.error("ID della convenzione non valido");
      return;
    }

    const formData = {
      conventionId: conventionId,
      sectionTitle: sectionData.sectionTitle,
      sectionSubtitle: sectionData.sectionSubtitle,
    };

    try {
      await dispatch(saveNewSection(conventionId, formData));
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate(`/convention/${conventionId}`);
      }, 1500);
    } catch (error) {
      console.error("Errore durante la creazione della sezione:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col className="col-11 col-md-8">
          <Card className="p-4 bg-primary-subtle ">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="sectionTitle">
                <Form.Label className="fw-bolder ">Section Title</Form.Label>
                <Form.Control
                  type="text"
                  name="sectionTitle"
                  value={sectionData.sectionTitle}
                  onChange={handleChange}
                  placeholder="Titolo della sezione della tua fiera esempio:Cosplay,Editori,Ospiti... "
                />
              </Form.Group>
              <Form.Group controlId="sectionSubtitle">
                <Form.Label className="fw-bolder ">Section Subtitle</Form.Label>
                <Form.Control
                  type="text"
                  name="sectionSubtitle"
                  value={sectionData.sectionSubtitle}
                  onChange={handleChange}
                  placeholder="Scrivi qui in breve di cosa tratta questa sezione!"
                />
              </Form.Group>
              <Button
                className="bg-info text-primary fw-bolder border border-3  border-primary-subtle mt-3"
                type="submit"
              >
                Add Section
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
              className="mt-3 border-primary fw-bolder fst-italic "
            >
              Sezione creata correttamente
            </Alert>
          </Col>
        </Row>
      )}
     
    </Container>
  );
};

export default AddSection;
