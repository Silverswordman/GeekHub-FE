import {
  FETCH_CONVENTION_DETAIL_REQUEST,
  FETCH_CONVENTION_DETAIL_SUCCESS,
  FETCH_CONVENTION_DETAIL_FAILURE,
} from "../actions/conventionactions";

import {
  UPLOAD_CONVENTION_LOGO_REQUEST,
  UPLOAD_CONVENTION_LOGO_SUCCESS,
  UPLOAD_CONVENTION_LOGO_FAILURE,
  UPLOAD_CONVENTION_COVER_REQUEST,
  UPLOAD_CONVENTION_COVER_SUCCESS,
  UPLOAD_CONVENTION_COVER_FAILURE,
} from "../actions/uploadactions";

const initialState = {
  conventionDetail: null,
  loading: false,
  error: null,
  logoUploadInProgress: false,
  coverUploadInProgress: false,
};

const conventionReducer = (state = initialState, action) => {
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
    case UPLOAD_CONVENTION_LOGO_REQUEST:
      return { ...state, logoUploadInProgress: true, error: null };
    case UPLOAD_CONVENTION_LOGO_SUCCESS:
      return { ...state, logoUploadInProgress: false, error: null };
    case UPLOAD_CONVENTION_LOGO_FAILURE:
      return { ...state, logoUploadInProgress: false, error: action.payload };
    case UPLOAD_CONVENTION_COVER_REQUEST:
      return { ...state, coverUploadInProgress: true, error: null };
    case UPLOAD_CONVENTION_COVER_SUCCESS:
      return { ...state, coverUploadInProgress: false, error: null };
    case UPLOAD_CONVENTION_COVER_FAILURE:
      return { ...state, coverUploadInProgress: false, error: action.payload };
    default:
      return state;
  }
};

export default conventionReducer;
