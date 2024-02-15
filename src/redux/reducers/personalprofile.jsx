import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPLOAD_PROFILE_PICTURE_REQUEST,
  UPLOAD_PROFILE_PICTURE_SUCCESS,
  UPLOAD_PROFILE_PICTURE_FAILURE,
} from "../actions/profileactions";

const initialState = {
  loading: false,
  profile: null,
  error: null,
};

const personalProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
    case UPLOAD_PROFILE_PICTURE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
        error: null,
      };
    case UPLOAD_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          avatar: action.payload, 
        },
        error: null,
      };
    case FETCH_PROFILE_FAILURE:
    case UPLOAD_PROFILE_PICTURE_FAILURE:
      return {
        loading: false,
        profile: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default personalProfileReducer;
