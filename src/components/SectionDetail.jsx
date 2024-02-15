import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSectionDetail } from "../redux/actions/conventionactions";
import { Spinner } from "react-bootstrap";

const SectionDetail = () => {
  const { sectionId, conventionId } = useParams();
  const dispatch = useDispatch();

  const { sectionDetail, loading, error } = useSelector(
    (state) => state.sectionDetails 
  );

  useEffect(() => {
    dispatch(getSectionDetail(conventionId, sectionId));
  }, [dispatch, conventionId, sectionId]);

  if (loading)
    return <Spinner animation="grow" className="text-info" size="sm" />;
  if (error) return <p>Error: {error}</p>;
  if (!sectionDetail) return null;

  return (
    <div>
      <h2>{sectionDetail.sectionTitle}</h2>
      <p>{sectionDetail.sectionSubtitle}</p>
    </div>
  );
};

export default SectionDetail;
