import  { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { saveNewSection } from "../redux/actions/conventionactions";

const AddSection = ({ conventionId }) => {
  const dispatch = useDispatch();
  const [sectionData, setSectionData] = useState({
    sectionTitle: "",
    sectionSubtitle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionData({ ...sectionData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveNewSection(conventionId, sectionData));
    setSectionData({ sectionTitle: "", sectionSubtitle: "" });
  };

  return (
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
  );
};

export default AddSection;
