import {
  FETCH_SECTION_DETAIL_SUCCESS,
  FETCH_SECTION_DETAIL_REQUEST,
  FETCH_SECTION_DETAIL_FAILURE,
} from "../actions/conventionactions";

const initialState = {
  sectionDetail: null,
  loading: false,
  error: null,
};

const sectionDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SECTION_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SECTION_DETAIL_SUCCESS:
      return {
        ...state,
        sectionDetail: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_SECTION_DETAIL_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default sectionDetailReducer;
