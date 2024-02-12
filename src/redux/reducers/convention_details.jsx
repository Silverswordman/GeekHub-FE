import {
  FETCH_CONVENTION_DETAIL_REQUEST,
  FETCH_CONVENTION_DETAIL_SUCCESS,
  FETCH_CONVENTION_DETAIL_FAILURE,
} from "../actions/conventionactions";

const initialState = {
  conventionDetail: null,
  loading: false,
  error: null,
};

const conventionDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONVENTION_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CONVENTION_DETAIL_SUCCESS:
      return {
        ...state,
        conventionDetail: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_CONVENTION_DETAIL_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default conventionDetailReducer;
