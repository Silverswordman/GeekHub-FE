import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Row,Col } from "react-bootstrap";
import { LuArrowBigLeftDash, LuArrowBigRightDash } from "react-icons/lu";

const NavigationButtons = () => {
  const navigate = useNavigate();
  const [historyIndex, setHistoryIndex] = useState(0);

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      navigate(-1);
    }
  };

  const goForward = () => {
    navigate(1);
    setHistoryIndex((prevIndex) => prevIndex + 1);
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = true;

  return (
    <Row className="ms-2  justify-content-end">
      <Col className="pe-0">
        <Button
          onClick={goBack}
          disabled={!canGoBack}
          className="bg-info text-primary  text-center rounded-pill hover-scale"
        >
          <LuArrowBigLeftDash className="fs-5" />
        </Button>
      </Col>
      <Col className="ps-1">
        <Button
          onClick={goForward}
          disabled={!canGoForward}
          className="bg-info text-primary  text-center rounded-pill  hover-scale"
        >
          <LuArrowBigRightDash className="fs-5" />
        </Button>
      </Col>
    </Row>
  );
};

export default NavigationButtons;
