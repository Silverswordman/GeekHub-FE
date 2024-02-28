import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SET_CURRENT_PAGE,
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  ADD_TO_FAVORITES_FAILURE,
  REMOVE_FROM_FAVORITES_REQUEST,
  REMOVE_FROM_FAVORITES_SUCCESS,
  REMOVE_FROM_FAVORITES_FAILURE,
  FETCH_FAVORITE_CONVENTIONS_REQUEST,
  FETCH_FAVORITE_CONVENTIONS_SUCCESS,
  FETCH_FAVORITE_CONVENTIONS_FAILURE,
  FETCH_FAVORITE_CONVENTIONS_BY_USER_REQUEST,
  FETCH_FAVORITE_CONVENTIONS_BY_USER_SUCCESS,
  FETCH_FAVORITE_CONVENTIONS_BY_USER_FAILURE,
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
  favoriteConventions: [],
  loadingFavoriteConventions: false,
  errorFavoriteConventions: null,
  favoriteConventionsByUser: [],
  loadingFavoriteConventionsByUser: false,
  errorFavoriteConventionsByUser: null,
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
    case ADD_TO_FAVORITES_REQUEST:
      return {
        ...state,
        addingToFavorites: true,
        addToFavoritesError: null,
      };
    case ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        addingToFavorites: false,
        favoriteConventions: [...state.favoriteConventions, action.payload],
      };
    case ADD_TO_FAVORITES_FAILURE:
      return {
        ...state,
        addingToFavorites: false,
        addToFavoritesError: action.payload,
      };
    case FETCH_FAVORITE_CONVENTIONS_REQUEST:
      return {
        ...state,
        loadingFavoriteConventions: true,
        errorFavoriteConventions: null,
      };
    case FETCH_FAVORITE_CONVENTIONS_SUCCESS:
      return {
        ...state,
        loadingFavoriteConventions: false,
        favoriteConventions: action.payload,
      };
    case FETCH_FAVORITE_CONVENTIONS_FAILURE:
      return {
        ...state,
        loadingFavoriteConventions: false,
        errorFavoriteConventions: action.payload,
      };
    case FETCH_FAVORITE_CONVENTIONS_BY_USER_REQUEST:
      return {
        ...state,
        loadingFavoriteConventionsByUser: true,
        errorFavoriteConventionsByUser: null,
      };
    case FETCH_FAVORITE_CONVENTIONS_BY_USER_SUCCESS:
      return {
        ...state,
        loadingFavoriteConventionsByUser: false,
        favoriteConventionsByUser: action.payload,
      };
    case FETCH_FAVORITE_CONVENTIONS_BY_USER_FAILURE:
      return {
        ...state,
        loadingFavoriteConventionsByUser: false,
        errorFavoriteConventionsByUser: action.payload,
      };
    case REMOVE_FROM_FAVORITES_REQUEST:
      return {
        ...state,
        removingFromFavorites: true,
        removeFromFavoritesError: null,
      };
    case REMOVE_FROM_FAVORITES_SUCCESS:
      return {
        ...state,
        removingFromFavorites: false,
        favoriteConventions: state.favoriteConventions.filter(
          (convention) => convention.conventionId !== action.payload
        ),
      };

    case REMOVE_FROM_FAVORITES_FAILURE:
      return {
        ...state,
        removingFromFavorites: false,
        removeFromFavoritesError: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
