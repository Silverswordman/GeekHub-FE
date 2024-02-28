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

export const fetchUsers = (page = 0, size = 15, order = "username") => {
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

export const ADD_TO_FAVORITES_REQUEST = "ADD_TO_FAVORITES_REQUEST";
export const ADD_TO_FAVORITES_SUCCESS = "ADD_TO_FAVORITES_SUCCESS";
export const ADD_TO_FAVORITES_FAILURE = "ADD_TO_FAVORITES_FAILURE";
export const addToFavorites = (userId, conventionId) => {
  return (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITES_REQUEST });

    const token = localStorage.getItem("token");

    fetch(`${urlprofile}/me/favorites/${conventionId}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossibile aggiungere la convention ai preferiti");
        }
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: ADD_TO_FAVORITES_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ADD_TO_FAVORITES_FAILURE,
          payload: error.message,
        });
      });
  };
};
export const FETCH_FAVORITE_CONVENTIONS_REQUEST =
  "FETCH_FAVORITE_CONVENTIONS_REQUEST";
export const FETCH_FAVORITE_CONVENTIONS_SUCCESS =
  "FETCH_FAVORITE_CONVENTIONS_SUCCESS";
export const FETCH_FAVORITE_CONVENTIONS_FAILURE =
  "FETCH_FAVORITE_CONVENTIONS_FAILURE";

export const fetchFavoriteConventionsRequest = () => ({
  type: FETCH_FAVORITE_CONVENTIONS_REQUEST,
});

export const fetchFavoriteConventionsSuccess = (data) => ({
  type: FETCH_FAVORITE_CONVENTIONS_SUCCESS,
  payload: data,
});

export const fetchFavoriteConventionsFailure = (error) => ({
  type: FETCH_FAVORITE_CONVENTIONS_FAILURE,
  payload: error,
});

export const fetchFavoriteConventions = () => {
  return (dispatch) => {
    dispatch(fetchFavoriteConventionsRequest());
    const token = localStorage.getItem("token");

    fetch(`${urlprofile}/me/favorites`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch favorite conventions");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchFavoriteConventionsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchFavoriteConventionsFailure(error.message));
      });
  };
};

export const FETCH_FAVORITE_CONVENTIONS_BY_USER_REQUEST =
  "FETCH_FAVORITE_CONVENTIONS_BY_USER_REQUEST";
export const FETCH_FAVORITE_CONVENTIONS_BY_USER_SUCCESS =
  "FETCH_FAVORITE_CONVENTIONS_BY_USER_SUCCESS";
export const FETCH_FAVORITE_CONVENTIONS_BY_USER_FAILURE =
  "FETCH_FAVORITE_CONVENTIONS_BY_USER_FAILURE";

export const fetchFavoriteConventionsByUserIdRequest = () => ({
  type: FETCH_FAVORITE_CONVENTIONS_BY_USER_REQUEST,
});

export const fetchFavoriteConventionsByUserIdSuccess = (data) => ({
  type: FETCH_FAVORITE_CONVENTIONS_BY_USER_SUCCESS,
  payload: data,
});

export const fetchFavoriteConventionsByUserIdFailure = (error) => ({
  type: FETCH_FAVORITE_CONVENTIONS_BY_USER_FAILURE,
  payload: error,
});

export const fetchFavoriteConventionsByUserId = (userId) => {
  return (dispatch) => {
    dispatch(fetchFavoriteConventionsByUserIdRequest());
    const token = localStorage.getItem("token");

    fetch(`${urlprofile}/${userId}/favorites`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch favorite conventions by user");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchFavoriteConventionsByUserIdSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchFavoriteConventionsByUserIdFailure(error.message));
      });
  };
};

export const REMOVE_FROM_FAVORITES_REQUEST = "REMOVE_FROM_FAVORITES_REQUEST";
export const REMOVE_FROM_FAVORITES_SUCCESS = "REMOVE_FROM_FAVORITES_SUCCESS";
export const REMOVE_FROM_FAVORITES_FAILURE = "REMOVE_FROM_FAVORITES_FAILURE";

export const removeFromFavoritesRequest = (conventionId) => ({
  type: REMOVE_FROM_FAVORITES_REQUEST,
  payload: conventionId,
});

export const removeFromFavoritesSuccess = (conventionId) => ({
  type: REMOVE_FROM_FAVORITES_SUCCESS,
  payload: conventionId,
});

export const removeFromFavoritesFailure = (error) => ({
  type: REMOVE_FROM_FAVORITES_FAILURE,
  payload: error,
});

export const removeFromFavorites = (userId, conventionId) => {
  return (dispatch) => {
    dispatch(removeFromFavoritesRequest());

    const token = localStorage.getItem("token");

    fetch(`${urlprofile}/me/favorites/${conventionId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossibile rimuovere la convention dai preferiti");
        }
        return response.json(); 
      })
      .then((data) => {
        const conventionId = data.conventionId; 
        dispatch(removeFromFavoritesSuccess(conventionId));
      })
      .catch((error) => {
        dispatch(removeFromFavoritesFailure(error.message));
      });
  };
};


