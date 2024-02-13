import Card from "react-bootstrap/Card";
import { format } from "date-fns";

function PageFooter() {
  const currentDate = new Date();
  const currentYear = format(currentDate, "yyyy");

  return (
    <Card className="text-center  bg-primary-subtle sticky-bottom">
      <Card.Footer className="text-muted small fst-italic">
        © Silvestrini Giulia for Epicode {currentYear}
      </Card.Footer>
    </Card>
  );
}
export default PageFooter;
