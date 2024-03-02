import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../redux/actions/profileactions";
import { setCurrentPage } from "../redux/actions/profileactions";
import { Button, Row, Col, Spinner, Card } from "react-bootstrap";
import { LuArrowBigLeftDash, LuArrowBigRightDash } from "react-icons/lu";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);
  const pageSize = 15;
  const order = "username";

  useEffect(() => {
    dispatch(fetchUsers(currentPage, pageSize, order));
  }, [dispatch, currentPage, pageSize, order]);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="grow" variant="info" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-white fs-2">
        Utenti non disponibili in questo momento.
      </p>
    );
  }

  return (
    <>
      <Row className="my-2 w-100 justify-content-center fadefromtop">
        {Array.isArray(users) &&
          users.map((user) => (
            <Col
              key={user.userId}
              className="m-3 col-11 col-sm-8 col-md-4 col-lg-3 h-100"
            >
              <Link
                to={`/users/${user.userId}`}
                className="text-decoration-none"
              >
                <Card className="bg-transparent bg-gradient text-white border-success-subtle border-4 shadow-lg p-4 hover-scale ">
                  <Card.Img
                    src={user.avatar}
                    className="w-25 rounded-pill border border-4 border-info"
                  ></Card.Img>
                  <Row className="text-end fs-5 fw-semibold fst-italic">
                    <Card.Text> {user.username}</Card.Text>
                  </Row>
                  <Card.Text>
                    {user.name} {user.surname}
                  </Card.Text>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
      <Row className="text-center">
        <Col>
          <Button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="text-primary-subtle bg-primary border-1 border-info hover-scale "
          >
            <LuArrowBigLeftDash className="fs-5 fw-bolder" />{" "}
          </Button>
          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="text-primary-subtle bg-primary border-1 border-info hover-scale "
          >
            <LuArrowBigRightDash className="fs-5 fw-bolder" />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default UserList;
