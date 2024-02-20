import {
  FETCH_SECTION_DETAIL_SUCCESS,
  FETCH_SECTION_DETAIL_REQUEST,
  FETCH_SECTION_DETAIL_FAILURE,
} from "../actions/conventionactions";
import {
  UPLOAD_SECTION_IMAGE_REQUEST,
  UPLOAD_SECTION_IMAGE_SUCCESS,
  UPLOAD_SECTION_IMAGE_FAILURE,
} from "../actions/uploadactions";

const initialState = {
  sectionDetail: null,
  loading: false,
  error: null,
  imageUrl: null,
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
    case UPLOAD_SECTION_IMAGE_REQUEST:
      return { ...state, loading: true, error: null };
    case UPLOAD_SECTION_IMAGE_SUCCESS:
      return {
        ...state,
        imageUrl: action.payload,
        loading: false,
        error: null,
      };
    case UPLOAD_SECTION_IMAGE_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default sectionDetailReducer;
