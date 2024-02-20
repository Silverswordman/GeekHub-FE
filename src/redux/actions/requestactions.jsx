export const FETCH_REQUESTS_REQUEST = "FETCH_REQUESTS_REQUEST";
export const FETCH_REQUESTS_SUCCESS = "FETCH_REQUESTS_SUCCESS";
export const FETCH_REQUESTS_FAILURE = "FETCH_REQUESTS_FAILURE";

export const fetchRequestsRequest = () => ({
  type: FETCH_REQUESTS_REQUEST,
});

export const fetchRequestsSuccess = (requests, totalPages, currentPage) => ({
  type: FETCH_REQUESTS_SUCCESS,
  payload: { requests: requests, totalPages, currentPage },
});

export const fetchRequestsFailure = (error) => ({
  type: FETCH_REQUESTS_FAILURE,
  payload: error,
});

export const fetchRequests = (page, pageSize) => {
  return async (dispatch) => {
    dispatch(fetchRequestsRequest());

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3003/users/requests?page=${page}&size=${pageSize}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await response.json();
      console.log("Data received:", data); // Aggiunto console.log per visualizzare i dati ricevuti
      const totalPages = data.totalPages;
      const currentPage = data.number;
      dispatch(fetchRequestsSuccess(data.content, totalPages, currentPage));
    } catch (error) {
      console.error("Error fetching requests:", error); // Aggiunto console.error per visualizzare eventuali errori
      dispatch(fetchRequestsFailure(error.message));
    }
  };
};
