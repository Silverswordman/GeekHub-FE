export const FETCH_REQUESTS_REQUEST = "FETCH_REQUESTS_REQUEST";
export const FETCH_REQUESTS_SUCCESS = "FETCH_REQUESTS_SUCCESS";
export const FETCH_REQUESTS_FAILURE = "FETCH_REQUESTS_FAILURE";

export const ACCEPT_REQUEST_REQUEST = "ACCEPT_REQUEST_REQUEST";
export const ACCEPT_REQUEST_SUCCESS = "ACCEPT_REQUEST_SUCCESS";
export const ACCEPT_REQUEST_FAILURE = "ACCEPT_REQUEST_FAILURE";

export const DECLINE_REQUEST_REQUEST = "DECLINE_REQUEST_REQUEST";
export const DECLINE_REQUEST_SUCCESS = "DECLINE_REQUEST_SUCCESS";
export const DECLINE_REQUEST_FAILURE = "DECLINE_REQUEST_FAILURE";

export const fetchRequestsRequest = () => ({
  type: FETCH_REQUESTS_REQUEST,
});

export const fetchRequestsSuccess = (requests, totalPages, currentPage) => ({
  type: FETCH_REQUESTS_SUCCESS,
  payload: { requests: requests.content, totalPages, currentPage },
});

export const fetchRequestsFailure = (error) => ({
  type: FETCH_REQUESTS_FAILURE,
  payload: error,
});

export const acceptRequestRequest = () => ({
  type: ACCEPT_REQUEST_REQUEST,
});

export const acceptRequestSuccess = () => ({
  type: ACCEPT_REQUEST_SUCCESS,
});

export const acceptRequestFailure = (error) => ({
  type: ACCEPT_REQUEST_FAILURE,
  payload: error,
});

export const declineRequestRequest = () => ({
  type: DECLINE_REQUEST_REQUEST,
});

export const declineRequestSuccess = () => ({
  type: DECLINE_REQUEST_SUCCESS,
});

export const declineRequestFailure = (error) => ({
  type: DECLINE_REQUEST_FAILURE,
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
      const totalPages = data.totalPages;
      const currentPage = data.number;
      dispatch(fetchRequestsSuccess(data, totalPages, currentPage));
    } catch (error) {
      dispatch(fetchRequestsFailure(error.message));
    }
  };
};

export const acceptRequest = (requestId) => {
  return async (dispatch) => {
    dispatch(acceptRequestRequest());

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3003/users/requests/${requestId}/accept`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept request");
      }

      dispatch(acceptRequestSuccess());
    } catch (error) {
      dispatch(acceptRequestFailure(error.message));
    }
  };
};

export const declineRequest = (requestId) => {
  return async (dispatch) => {
    dispatch(declineRequestRequest());

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3003/users/requests/${requestId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to decline request");
      }

      dispatch(declineRequestSuccess());
    } catch (error) {
      dispatch(declineRequestFailure(error.message));
    }
  };
};
