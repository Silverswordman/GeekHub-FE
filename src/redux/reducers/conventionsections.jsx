import {
  FETCH_CONVENTION_SECTIONS_REQUEST,
  FETCH_CONVENTION_SECTIONS_SUCCESS,
  FETCH_CONVENTION_SECTIONS_FAILURE,
  SAVE_SECTION_SUCCESS,
  SAVE_SECTION_FAILURE,
} from "../actions/conventionactions";
import { UPDATE_SECTION_SUCCESS } from "../actions/update&deleteactions";

const initialState = {
  sections: [],
  loading: false,
  error: null,
};
const conventionSectionsReducer = (state = initialState, action) => {
  let updatedSections;

  switch (action.type) {
    case FETCH_CONVENTION_SECTIONS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CONVENTION_SECTIONS_SUCCESS:
      return {
        ...state,
        sections: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_CONVENTION_SECTIONS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case SAVE_SECTION_SUCCESS:
      return {
        ...state,
        sections: [...state.sections, action.payload],
        loading: false,
        error: null,
      };
    case SAVE_SECTION_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_SECTION_SUCCESS:
      updatedSections = state.sections.map((section) =>
        section.id === action.payload.id ? action.payload : section
      );
      return {
        ...state,
        sections: updatedSections,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default conventionSectionsReducer;
