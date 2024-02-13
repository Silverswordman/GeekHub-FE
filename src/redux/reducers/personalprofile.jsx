import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
} from "../actions/profileactions";


// stato iniziale del profilo

const initialState = {
  loading: false,
  profile: null,
  error: null,
};

const personalProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
        error: "",
      };
    case FETCH_PROFILE_FAILURE:
      return {
        loading: false,
        profile: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default personalProfileReducer;
