// export generali
export const FETCH_CONVENTIONS_REQUEST = "FETCH_CONVENTIONS_REQUEST";
export const FETCH_CONVENTIONS_SUCCESS = "FETCH_CONVENTIONS_SUCCESS";
export const FETCH_CONVENTIONS_FAILURE = "FETCH_CONVENTIONS_FAILURE";

// export dei dettagli
export const FETCH_CONVENTION_DETAIL_REQUEST =
  "FETCH_CONVENTION_DETAIL_REQUEST";
export const FETCH_CONVENTION_DETAIL_SUCCESS =
  "FETCH_CONVENTION_DETAIL_SUCCESS";
export const FETCH_CONVENTION_DETAIL_FAILURE =
  "FETCH_CONVENTION_DETAIL_FAILURE";

// export sezione
export const FETCH_CONVENTION_SECTIONS_REQUEST =
  "FETCH_CONVENTION_SECTIONS_REQUEST";
export const FETCH_CONVENTION_SECTIONS_SUCCESS =
  "FETCH_CONVENTION_SECTIONS_SUCCESS";
export const FETCH_CONVENTION_SECTIONS_FAILURE =
  "FETCH_CONVENTION_SECTIONS_FAILURE";

export const SAVE_CONVENTION_SUCCESS = "SAVE_CONVENTION_SUCCESS";
export const SAVE_CONVENTION_FAILURE = "SAVE_CONVENTION_FAILURE";

const urlconventions = "http://localhost:3003/conventions";

export const getConventions = (currentPage) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CONVENTIONS_REQUEST });

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${urlconventions}?page=${currentPage}`, {
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Errore nel caricamento dati");
      }

      const data = await response.json();
      dispatch({ type: FETCH_CONVENTIONS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_CONVENTIONS_FAILURE, payload: error.message });
    }
  };
};

export const getConventionDetail = (conventionId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CONVENTION_DETAIL_REQUEST });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${urlconventions}/${conventionId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Errore nel caricamento dei dettagli della convention");
      }

      const data = await response.json();
      dispatch({ type: FETCH_CONVENTION_DETAIL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_CONVENTION_DETAIL_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getConventionSections = (
  conventionId,
  page = 0,
  size = 6,
  order = "sectionTitle"
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CONVENTION_SECTIONS_REQUEST });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${urlconventions}/${conventionId}/sec?page=${page}&size=${size}&order=${order}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore nel caricamento delle sezioni");
      }

      const data = await response.json();

      dispatch({ type: FETCH_CONVENTION_SECTIONS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_CONVENTION_SECTIONS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const saveConventionSuccess = (convention) => ({
  type: SAVE_CONVENTION_SUCCESS,
  payload: convention,
});

export const saveConventionFailure = (error) => ({
  type: SAVE_CONVENTION_FAILURE,
  payload: error,
});

export const saveNewConvention = (formData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(urlconventions, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      dispatch(saveConventionSuccess(data));
    } catch (error) {
      dispatch(saveConventionFailure(error.message));
    }
  };
};
export const SAVE_SECTION_REQUEST = "SAVE_SECTION_REQUEST";
export const SAVE_SECTION_SUCCESS = "SAVE_SECTION_SUCCESS";
export const SAVE_SECTION_FAILURE = "SAVE_SECTION_FAILURE";

export const saveSectionRequest = () => ({
  type: SAVE_SECTION_REQUEST,
});

export const saveSectionSuccess = (data) => ({
  type: SAVE_SECTION_SUCCESS,
  payload: data,
});

export const saveSectionFailure = (error) => ({
  type: SAVE_SECTION_FAILURE,
  payload: error,
});

export const saveNewSection = (conventionId, formData) => {
  return async (dispatch) => {
    dispatch(saveSectionRequest());

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${urlconventions}/${conventionId}/sec`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Errore durante il salvataggio della nuova sezione");
      }

      const data = await response.json();
      dispatch(saveSectionSuccess(data));
    } catch (error) {
      dispatch(saveSectionFailure(error.message));
    }
  };
};

export const FETCH_SECTION_DETAIL_REQUEST = "FETCH_SECTION_DETAIL_REQUEST";
export const FETCH_SECTION_DETAIL_SUCCESS = "FETCH_SECTION_DETAIL_SUCCESS";
export const FETCH_SECTION_DETAIL_FAILURE = "FETCH_SECTION_DETAIL_FAILURE";

export const fetchSectionDetailSuccess = (sectionDetail) => ({
  type: FETCH_SECTION_DETAIL_SUCCESS,
  payload: sectionDetail,
});

export const getSectionDetail = (conventionId, sectionId) => {
  return async (dispatch) => {
    try {
      console.log(
        "Fetching section detail with conventionId:",
        conventionId,
        "and sectionId:",
        sectionId
      ); // console log di controllo

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${urlconventions}/${conventionId}/sec/${sectionId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore nel caricamento dei dettagli della sezione");
      }

      const sectionDetail = await response.json();
      dispatch(fetchSectionDetailSuccess(sectionDetail));
    } catch (error) {
      console.error("Errore:", error);
    }
  };
};

export const FETCH_SUBSECTIONS_REQUEST = "FETCH_SUBSECTIONS_REQUEST";
export const FETCH_SUBSECTIONS_SUCCESS = "FETCH_SUBSECTIONS_SUCCESS";
export const FETCH_SUBSECTIONS_FAILURE = "FETCH_SUBSECTIONS_FAILURE";

export const getSubsections = (
  conventionId,
  sectionId,
  page = 0,
  size = 6,
  order = "subsectionTitle"
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SUBSECTIONS_REQUEST });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${urlconventions}/${conventionId}/sec/${sectionId}/?page=${page}&size=${size}&order=${order}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore nel caricamento delle sottosezioni");
      }

      const data = await response.json();
      dispatch({ type: FETCH_SUBSECTIONS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_SUBSECTIONS_FAILURE, payload: error.message });
    }
  };
};
export const UPLOAD_CONVENTION_LOGO_REQUEST = "UPLOAD_CONVENTION_LOGO_REQUEST";
export const UPLOAD_CONVENTION_LOGO_SUCCESS = "UPLOAD_CONVENTION_LOGO_SUCCESS";
export const UPLOAD_CONVENTION_LOGO_FAILURE = "UPLOAD_CONVENTION_LOGO_FAILURE";

export const uploadConventionLogoRequest = () => ({
  type: UPLOAD_CONVENTION_LOGO_REQUEST,
});

export const uploadConventionLogoSuccess = (imageUrl) => ({
  type: UPLOAD_CONVENTION_LOGO_SUCCESS,
  payload: imageUrl,
});

export const uploadConventionLogoFailure = (error) => ({
  type: UPLOAD_CONVENTION_LOGO_FAILURE,
  payload: error,
});

export const uploadConventionLogo = (file, conventionId) => {
  return async (dispatch) => {
    dispatch(uploadConventionLogoRequest());

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `${urlconventions}/${conventionId}/uploadLogo`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante il caricamento del logo della fiera");
      }

      // Ottieni direttamente l'URL dell'immagine dalla risposta
      const imageUrl = await response.text();

      dispatch(uploadConventionLogoSuccess(imageUrl));
      dispatch(getConventionDetail(conventionId));
    } catch (error) {
      dispatch(uploadConventionLogoFailure(error.message));
    }
  };
};

export const UPLOAD_CONVENTION_COVER_REQUEST =
  "UPLOAD_CONVENTION_COVER_REQUEST";
export const UPLOAD_CONVENTION_COVER_SUCCESS =
  "UPLOAD_CONVENTION_COVER_SUCCESS";
export const UPLOAD_CONVENTION_COVER_FAILURE =
  "UPLOAD_CONVENTION_COVER_FAILURE";

export const uploadConventionCoverRequest = () => ({
  type: UPLOAD_CONVENTION_COVER_REQUEST,
});

export const uploadConventionCoverSuccess = (imageUrl) => ({
  type: UPLOAD_CONVENTION_COVER_SUCCESS,
  payload: imageUrl,
});

export const uploadConventionCoverFailure = (error) => ({
  type: UPLOAD_CONVENTION_COVER_FAILURE,
  payload: error,
});

export const uploadConventionCover = (file, conventionId) => {
  return async (dispatch) => {
    dispatch(uploadConventionCoverRequest());

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `${urlconventions}/${conventionId}/uploadCover`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Errore durante il caricamento della copertina della fiera"
        );
      }

      const imageUrl = await response.text();

      dispatch(uploadConventionCoverSuccess(imageUrl));
      dispatch(getConventionDetail(conventionId));
    } catch (error) {
      dispatch(uploadConventionCoverFailure(error.message));
    }
  };
};

export const SAVE_SUBSECTION_REQUEST = "SAVE_SUBSECTION_REQUEST";
export const SAVE_SUBSECTION_SUCCESS = "SAVE_SUBSECTION_SUCCESS";
export const SAVE_SUBSECTION_FAILURE = "SAVE_SUBSECTION_FAILURE";

export const saveSubsectionRequest = () => ({
  type: SAVE_SUBSECTION_REQUEST,
});

export const saveSubsectionSuccess = (data) => ({
  type: SAVE_SUBSECTION_SUCCESS,
  payload: data,
});

export const saveSubsectionFailure = (error) => ({
  type: SAVE_SUBSECTION_FAILURE,
  payload: error,
});

export const saveNewSubsection = (conventionId, sectionId, formData) => {
  return async (dispatch) => {
    dispatch(saveSubsectionRequest());

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${urlconventions}/${conventionId}/sec/${sectionId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Errore durante il salvataggio della nuova sottosezione"
        );
      }

      const data = await response.json();
      dispatch(saveSubsectionSuccess(data));
    } catch (error) {
      dispatch(saveSubsectionFailure(error.message));
    }
  };
};
