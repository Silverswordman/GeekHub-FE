
import {
  SAVE_SUBSECTION_REQUEST,
  SAVE_SUBSECTION_SUCCESS,
  SAVE_SUBSECTION_FAILURE,
} from "../actions/conventionactions";

const initialState = {
  loading: false,
  error: null,
  subsection: null,
};

const newSubsectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SUBSECTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        subsection: null,
      };
    case SAVE_SUBSECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        subsection: action.payload,
      };
    case SAVE_SUBSECTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        subsection: null,
      };
    default:
      return state;
  }
};

export default newSubsectionReducer;
