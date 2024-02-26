import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SET_CURRENT_PAGE,
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
} from "../actions/profileactions";

const initialState = {
  users: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 0,
  userProfile: null,
  loadingProfile: false,
  errorProfile: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.content,
        totalPages: action.payload.totalPages,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case FETCH_USER_PROFILE_REQUEST:
      return {
        ...state,
        loadingProfile: true,
        errorProfile: null,
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loadingProfile: false,
        userProfile: action.payload,
      };
    case FETCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        loadingProfile: false,
        errorProfile: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
