import {
  FETCH_CONVENTIONS_REQUEST,
  FETCH_CONVENTIONS_SUCCESS,
  FETCH_CONVENTIONS_FAILURE,
} from "../actions/conventionactions";

const initialState = {
  conventions: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 0,
};

const conventionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONVENTIONS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CONVENTIONS_SUCCESS:
      return {
        ...state,
        conventions: action.payload.content,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.pageable.pageNumber,
        loading: false,
        error: null,
      };
    case FETCH_CONVENTIONS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default conventionReducer;
