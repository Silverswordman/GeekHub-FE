import {
  FETCH_REQUESTS_REQUEST,
  FETCH_REQUESTS_SUCCESS,
  FETCH_REQUESTS_FAILURE,
  ACCEPT_REQUEST_REQUEST,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_FAILURE,
  DECLINE_REQUEST_REQUEST,
  DECLINE_REQUEST_SUCCESS,
  DECLINE_REQUEST_FAILURE,
} from "../actions/requestactions";

const initialState = {
  requests: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 0,
};

const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUESTS_REQUEST:
    case ACCEPT_REQUEST_REQUEST:
    case DECLINE_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: action.payload.requests,
        loading: false,
        error: null,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case ACCEPT_REQUEST_SUCCESS:
    case DECLINE_REQUEST_SUCCESS:
      return state;
    case FETCH_REQUESTS_FAILURE:
    case ACCEPT_REQUEST_FAILURE:
    case DECLINE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default requestsReducer;
