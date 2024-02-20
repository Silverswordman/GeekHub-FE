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
