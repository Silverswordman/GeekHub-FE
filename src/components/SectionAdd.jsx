import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
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
      }, 3000);
    } catch (error) {
      console.error("Errore durante la creazione della sezione:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="sectionTitle">
          <Form.Label>Section Title</Form.Label>
          <Form.Control
            type="text"
            name="sectionTitle"
            value={sectionData.sectionTitle}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="sectionSubtitle">
          <Form.Label>Section Subtitle</Form.Label>
          <Form.Control
            type="text"
            name="sectionSubtitle"
            value={sectionData.sectionSubtitle}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Section
        </Button>
      </Form>
      {showSuccessMessage && (
        <Alert variant="success" className="mt-3">
          Sezione creata correttamente
        </Alert>
      )}
    </div>
  );
};

export default AddSection;
