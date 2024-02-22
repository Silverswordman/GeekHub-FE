export const UPDATE_CONVENTION_SUCCESS = "UPDATE_CONVENTION_SUCCESS";
export const UPDATE_CONVENTION_FAILURE = "UPDATE_CONVENTION_FAILURE";
const urlconventions = "http://localhost:3003/conventions";

export const updateConventionSuccess = (convention) => ({
  type: UPDATE_CONVENTION_SUCCESS,
  payload: convention,
});

export const updateConventionFailure = (error) => ({
  type: UPDATE_CONVENTION_FAILURE,
  payload: error,
});

export const updateConvention = (conventionId, formData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${urlconventions}/${conventionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      dispatch(updateConventionSuccess(data));
    } catch (error) {
      dispatch(updateConventionFailure(error.message));
    }
  };
};
export const UPDATE_SECTION_REQUEST = "UPDATE_SECTION_REQUEST";
export const UPDATE_SECTION_SUCCESS = "UPDATE_SECTION_SUCCESS";
export const UPDATE_SECTION_FAILURE = "UPDATE_SECTION_FAILURE";

export const updateSectionRequest = () => ({
  type: UPDATE_SECTION_REQUEST,
});

export const updateSectionSuccess = (data) => ({
  type: UPDATE_SECTION_SUCCESS,
  payload: data,
});

export const updateSectionFailure = (error) => ({
  type: UPDATE_SECTION_FAILURE,
  payload: error,
});

export const updateSection = (conventionId, sectionId, formData) => {
  return async (dispatch) => {
    dispatch(updateSectionRequest());

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${urlconventions}/${conventionId}/sec/${sectionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento della sezione");
      }

      const data = await response.json();
      dispatch(updateSectionSuccess(data));
    } catch (error) {
      dispatch(updateSectionFailure(error.message));
    }
  };
};
// actions/subsectionActions.js

export const UPDATE_SUBSECTION_REQUEST = "UPDATE_SUBSECTION_REQUEST";
export const UPDATE_SUBSECTION_SUCCESS = "UPDATE_SUBSECTION_SUCCESS";
export const UPDATE_SUBSECTION_FAILURE = "UPDATE_SUBSECTION_FAILURE";

export const updateSubsectionRequest = () => ({
  type: UPDATE_SUBSECTION_REQUEST,
});

export const updateSubsectionSuccess = (data) => ({
  type: UPDATE_SUBSECTION_SUCCESS,
  payload: data,
});

export const updateSubsectionFailure = (error) => ({
  type: UPDATE_SUBSECTION_FAILURE,
  payload: error,
});

export const updateSubsection = (
  conventionId,
  sectionId,
  subsectionId,
  formData
) => {
  return async (dispatch) => {
    dispatch(updateSubsectionRequest());

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${urlconventions}/${conventionId}/sec/${sectionId}/${subsectionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento della sotto-sezione");
      }

      const data = await response.json();
      dispatch(updateSubsectionSuccess(data));
    } catch (error) {
      dispatch(updateSubsectionFailure(error.message));
    }
  };
};
export const DELETE_CONVENTION_REQUEST = "DELETE_CONVENTION_REQUEST";
export const DELETE_CONVENTION_SUCCESS = "DELETE_CONVENTION_SUCCESS";
export const DELETE_CONVENTION_FAILURE = "DELETE_CONVENTION_FAILURE";

export const deleteConventionRequest = () => ({
  type: DELETE_CONVENTION_REQUEST,
});

export const deleteConventionSuccess = () => ({
  type: DELETE_CONVENTION_SUCCESS,
});

export const deleteConventionFailure = (error) => ({
  type: DELETE_CONVENTION_FAILURE,
  payload: error,
});

export const deleteConvention = (conventionId) => {
  return async (dispatch) => {
    dispatch(deleteConventionRequest());

    try {
      const token = localStorage.getItem("token");
      await fetch(`${urlconventions}/${conventionId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteConventionSuccess());
    } catch (error) {
      dispatch(deleteConventionFailure(error.message));
    }
  };
};
// Azioni per il file conventionactions.js

export const DELETE_SECTION_REQUEST = "DELETE_SECTION_REQUEST";
export const DELETE_SECTION_SUCCESS = "DELETE_SECTION_SUCCESS";
export const DELETE_SECTION_FAILURE = "DELETE_SECTION_FAILURE";

export const deleteSectionRequest = () => ({
  type: DELETE_SECTION_REQUEST,
});

export const deleteSectionSuccess = () => ({
  type: DELETE_SECTION_SUCCESS,
});

export const deleteSectionFailure = (error) => ({
  type: DELETE_SECTION_FAILURE,
  payload: error,
});

export const deleteSection = (conventionId, sectionId) => {
  return async (dispatch) => {
    dispatch(deleteSectionRequest());

    try {
      const token = localStorage.getItem("token");
      await fetch(`${urlconventions}/${conventionId}/sec/${sectionId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteSectionSuccess());
    } catch (error) {
      dispatch(deleteSectionFailure(error.message));
    }
  };
};
export const DELETE_SUBSECTION_REQUEST = "DELETE_SUBSECTION_REQUEST";
export const DELETE_SUBSECTION_SUCCESS = "DELETE_SUBSECTION_SUCCESS";
export const DELETE_SUBSECTION_FAILURE = "DELETE_SUBSECTION_FAILURE";

export const deleteSubsectionRequest = () => ({
  type: DELETE_SUBSECTION_REQUEST,
});

export const deleteSubsectionSuccess = () => ({
  type: DELETE_SUBSECTION_SUCCESS,
});

export const deleteSubsectionFailure = (error) => ({
  type: DELETE_SUBSECTION_FAILURE,
  payload: error,
});

export const deleteSubsection = (conventionId, sectionId, subsectionId) => {
  return async (dispatch) => {
    dispatch(deleteSubsectionRequest());

    try {
      const token = localStorage.getItem("token");
      await fetch(
        `${urlconventions}/${conventionId}/sec/${sectionId}/${subsectionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(deleteSubsectionSuccess());
    } catch (error) {
      dispatch(deleteSubsectionFailure(error.message));
    }
  };
};
