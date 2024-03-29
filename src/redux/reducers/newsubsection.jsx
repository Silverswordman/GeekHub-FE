import {
  SAVE_SUBSECTION_REQUEST,
  SAVE_SUBSECTION_SUCCESS,
  SAVE_SUBSECTION_FAILURE,
} from "../actions/conventionactions";

import {
  UPDATE_SUBSECTION_REQUEST,
  UPDATE_SUBSECTION_SUCCESS,
  UPDATE_SUBSECTION_FAILURE,
  DELETE_SUBSECTION_REQUEST,
  DELETE_SUBSECTION_SUCCESS,
  DELETE_SUBSECTION_FAILURE,
} from "../actions/update&deleteactions";

const initialState = {
  loading: false,
  error: null,
  subsection: null,
};

const subsectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SUBSECTION_REQUEST:
    case UPDATE_SUBSECTION_REQUEST:
    case DELETE_SUBSECTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SAVE_SUBSECTION_SUCCESS:
    case UPDATE_SUBSECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        subsection: action.payload,
      };
    case DELETE_SUBSECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        subsection: state.subsection,
      };
    case SAVE_SUBSECTION_FAILURE:
    case UPDATE_SUBSECTION_FAILURE:
    case DELETE_SUBSECTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default subsectionReducer;
