import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Alert,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSectionDetail } from "../redux/actions/conventionactions";
import { updateSection } from "../redux/actions/update&deleteactions";

const UpdateSectionForm = () => {
  const { conventionId, sectionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sectionDetail = useSelector(
    (state) => state.sectionDetails.sectionDetail
  );
  const [sectionData, setSectionData] = useState({
    sectionTitle: "",
    sectionSubtitle: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    dispatch(getSectionDetail(conventionId, sectionId));
  }, [dispatch, conventionId, sectionId]);

  useEffect(() => {
    if (sectionDetail) {
      setSectionData({
        sectionTitle: sectionDetail.sectionTitle,
        sectionSubtitle: sectionDetail.sectionSubtitle,
      });
    }
  }, [sectionDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionData({ ...sectionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!conventionId || !sectionId) {
      console.error("ID della fiera o della sezione non validi");
      return;
    }

    const formData = {
      sectionTitle: sectionData.sectionTitle,
      sectionSubtitle: sectionData.sectionSubtitle,
    };

    try {
      await dispatch(updateSection(conventionId, sectionId, formData));
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate(`/convention/${conventionId}`);
      }, 1500);
    } catch (error) {
      console.error("Errore durante l'aggiornamento della sezione:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col className="col-11 col-md-8">
          <Card className="p-4 bg-primary-subtle  border border-4 border-info">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="sectionTitle">
                <Form.Label className="fw-bolder">
                  Inserisci qui il nuovo titolo della sezione
                </Form.Label>
                <Form.Control
                  type="text"
                  name="sectionTitle"
                  value={sectionData.sectionTitle}
                  onChange={handleChange}
                  placeholder="Nuovo titolo della sezione"
                />
              </Form.Group>
              <Form.Group controlId="sectionSubtitle">
                <Form.Label className="fw-bolder">
                  Inserisci qui la nuova descrizione della sezione
                </Form.Label>
                <Form.Control
                  type="text"
                  name="sectionSubtitle"
                  value={sectionData.sectionSubtitle}
                  onChange={handleChange}
                  placeholder="Nuova descrizione della sezione"
                />
              </Form.Group>
              <Button
                className="bg-info text-primary fw-bolder border border-3  border-primary-subtle mt-3 hover-scale"
                type="submit"
              >
                Aggiorna Area
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
              Area aggiornata correttamente
            </Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UpdateSectionForm;
