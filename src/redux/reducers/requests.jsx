import {
  FETCH_REQUESTS_REQUEST,
  FETCH_REQUESTS_SUCCESS,
  FETCH_REQUESTS_FAILURE,
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
        currentPage: action.payload.number,
      };
    case FETCH_REQUESTS_FAILURE:
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
