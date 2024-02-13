export const FETCH_CONVENTIONS_REQUEST = "FETCH_CONVENTIONS_REQUEST";
export const FETCH_CONVENTIONS_SUCCESS = "FETCH_CONVENTIONS_SUCCESS";
export const FETCH_CONVENTIONS_FAILURE = "FETCH_CONVENTIONS_FAILURE";
export const FETCH_CONVENTION_DETAIL_REQUEST =
  "FETCH_CONVENTION_DETAIL_REQUEST";
export const FETCH_CONVENTION_DETAIL_SUCCESS =
  "FETCH_CONVENTION_DETAIL_SUCCESS";
export const FETCH_CONVENTION_DETAIL_FAILURE =
  "FETCH_CONVENTION_DETAIL_FAILURE";

export const FETCH_CONVENTION_SECTIONS_REQUEST =
  "FETCH_CONVENTION_SECTIONS_REQUEST";
export const FETCH_CONVENTION_SECTIONS_SUCCESS =
  "FETCH_CONVENTION_SECTIONS_SUCCESS";
export const FETCH_CONVENTION_SECTIONS_FAILURE =
  "FETCH_CONVENTION_SECTIONS_FAILURE";

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
