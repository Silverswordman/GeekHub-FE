export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";

const urlprofile = "http://localhost:3003/users";

//fetch proprio profilo

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
          throw new Error("Problemi con il Server risolveremo al piu presto");
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

export const UPLOAD_PROFILE_PICTURE_REQUEST = "UPLOAD_PROFILE_PICTURE_REQUEST";
export const UPLOAD_PROFILE_PICTURE_SUCCESS = "UPLOAD_PROFILE_PICTURE_SUCCESS";
export const UPLOAD_PROFILE_PICTURE_FAILURE = "UPLOAD_PROFILE_PICTURE_FAILURE";

export const uploadProfilePicture = (file) => {
  return (dispatch) => {
    dispatch({ type: UPLOAD_PROFILE_PICTURE_REQUEST });
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);

    fetch(`${urlprofile}/me/upload`, {
      method: "PATCH",
      headers: {
        Authorization: `${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossibile caricare la nuova immagine");
        }
        return response.text();
      })
      .then((imageUrl) => {
        dispatch({
          type: UPLOAD_PROFILE_PICTURE_SUCCESS,
          payload: imageUrl,
        });
        dispatch(fetchProfile());
      });
  };
};

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"; // Aggiunta

const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

const fetchUsersSuccess = (data) => ({
  type: FETCH_USERS_SUCCESS,
  payload: data,
});

const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const fetchUsers = (page=0, size=15, order = "username") => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch(fetchUsersRequest());
    fetch(`${urlprofile}?page=${page}&size=${size}&order=${order}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante il recupero degli utenti");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchUsersSuccess(data));
        dispatch(setCurrentPage(page));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};
export const FETCH_USER_PROFILE_REQUEST = "FETCH_USER_PROFILE_REQUEST";
export const FETCH_USER_PROFILE_SUCCESS = "FETCH_USER_PROFILE_SUCCESS";
export const FETCH_USER_PROFILE_FAILURE = "FETCH_USER_PROFILE_FAILURE";

export const fetchUserProfileRequest = () => ({
  type: FETCH_USER_PROFILE_REQUEST,
});

export const fetchUserProfileSuccess = (data) => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  payload: data,
});

export const fetchUserProfileFailure = (error) => ({
  type: FETCH_USER_PROFILE_FAILURE,
  payload: error,
});

export const fetchUserProfile = (userId) => {
  return (dispatch) => {
    dispatch(fetchUserProfileRequest());
    const token = localStorage.getItem("token");
    fetch(`${urlprofile}/${userId}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchUserProfileSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchUserProfileFailure(error.message));
      });
  };
};