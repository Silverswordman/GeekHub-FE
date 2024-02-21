import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Button} from "react-bootstrap";
import { LuArrowBigLeftDash,LuArrowBigRightDash } from "react-icons/lu";

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
    <div>
      <Button onClick={goBack} disabled={!canGoBack} className="bg-info text-primary  text-center rounded-pill">
      <LuArrowBigLeftDash className="fs-5" />
      </Button>
      <Button onClick={goForward} disabled={!canGoForward} className="bg-info text-primary  text-center rounded-pill ">
      <LuArrowBigRightDash className="fs-5"/>
      </Button>
    </div>
  );
};

export default NavigationButtons;
