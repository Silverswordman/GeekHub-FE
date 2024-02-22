// Import delle azioni esistenti
import {
  SAVE_CONVENTION_SUCCESS,
  SAVE_CONVENTION_FAILURE,
} from "../actions/conventionactions";
import {
  DELETE_CONVENTION_SUCCESS,
  DELETE_CONVENTION_FAILURE,
} from "../actions/update&deleteactions";

const initialState = {
  convention: null,
  error: null,
};

const conventionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CONVENTION_SUCCESS:
      return {
        ...state,
        convention: action.payload,
        error: null,
      };
    case SAVE_CONVENTION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_CONVENTION_SUCCESS:
      return {
        ...state,
        convention: null,
        error: null,
      };
    case DELETE_CONVENTION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default conventionReducer;
