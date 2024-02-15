import {
  FETCH_CONVENTION_SECTIONS_REQUEST,
  FETCH_CONVENTION_SECTIONS_SUCCESS,
  FETCH_CONVENTION_SECTIONS_FAILURE,
  SAVE_CONVENTION_SUCCESS,
  SAVE_CONVENTION_FAILURE,
} from "../actions/conventionactions";

const initialState = {
  sections: [],
  loading: false,
  error: null,
};

const conventionSectionsReducer = (state = initialState, action) => {
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
    case SAVE_CONVENTION_SUCCESS:
      return {
        ...state,
        sections: [...state.sections, action.payload],
        loading: false,
        error: null,
      };
    case SAVE_CONVENTION_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default conventionSectionsReducer;
