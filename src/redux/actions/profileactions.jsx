// profileActions.js

export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";

const urlprofile = "http://localhost:3003/users";

export const fetchProfile = () => {
  return (dispatch) => {
    dispatch(fetchProfileRequest());
    const token = localStorage.getItem("token");
    fetch(`${urlprofile}/me`, {
      headers: {
        Authorization: ` ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchProfileSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchProfileFailure(error.message));
      });
  };
};

const fetchProfileRequest = () => {
  return {
    type: FETCH_PROFILE_REQUEST,
  };
};

const fetchProfileSuccess = (data) => {
  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: data,
  };
};

const fetchProfileFailure = (error) => {
  return {
    type: FETCH_PROFILE_FAILURE,
    payload: error,
  };
};
