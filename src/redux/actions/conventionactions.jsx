export const FETCH_CONVENTIONS_REQUEST = "FETCH_CONVENTIONS_REQUEST";
export const FETCH_CONVENTIONS_SUCCESS = "FETCH_CONVENTIONS_SUCCESS";
export const FETCH_CONVENTIONS_FAILURE = "FETCH_CONVENTIONS_FAILURE";

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
