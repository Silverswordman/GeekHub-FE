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
