import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavigationButtons = () => {
  const navigate = useNavigate();
  const [historyIndex, setHistoryIndex] = useState(0);

  const goBack = () => {
    if (historyIndex > 0) {
      navigate(-1);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const goForward = () => {
    navigate(1);
    setHistoryIndex(historyIndex + 1);
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = true;

  return (
    <div>
      <button onClick={goBack} disabled={!canGoBack}>
        {"<"}
      </button>
      <button onClick={goForward} disabled={!canGoForward}>
        {">"}
      </button>
    </div>
  );
};

export default NavigationButtons;
