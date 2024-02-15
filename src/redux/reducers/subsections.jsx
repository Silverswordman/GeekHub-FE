// subsectionsReducer.js
import {
  FETCH_SUBSECTIONS_SUCCESS,
  FETCH_SUBSECTIONS_FAILURE,
} from "../actions/conventionactions";

const initialState = {
  subsections: [],
  loading: false,
  error: null,
};

const subsectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBSECTIONS_SUCCESS:
      return {
        ...state,
        subsections: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_SUBSECTIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default subsectionsReducer;
