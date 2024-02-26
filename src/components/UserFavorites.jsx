import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchFavoriteConventions,
  fetchFavoriteConventionsByUserId,
} from "../redux/actions/profileactions";

const UserFavorites = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const {
    favoriteConventions,
    loadingFavoriteConventions,
    errorFavoriteConventions,
    favoriteConventionsByUser,
    loadingFavoriteConventionsByUser,
    errorFavoriteConventionsByUser,
  } = useSelector((state) => state.users);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavoriteConventionsByUserId(userId));
    } else {
      dispatch(fetchFavoriteConventions());
    }
  }, [dispatch, userId]);

  const loading = userId
    ? loadingFavoriteConventionsByUser
    : loadingFavoriteConventions;
  const error = userId
    ? errorFavoriteConventionsByUser
    : errorFavoriteConventions;

  if (loading) {
    return <Spinner ></Spinner>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const conventions = userId ? favoriteConventionsByUser : favoriteConventions;

  return (
    <div className="text-white">
      <h2>Favorite Conventions</h2>
      <ul>
        {conventions.map((convention) => (
          <li key={convention.conventionId}>{convention.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserFavorites;
