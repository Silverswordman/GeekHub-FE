import {
  SAVE_CONVENTION_SUCCESS,
  SAVE_CONVENTION_FAILURE,
} from "../actions/conventionactions";

const initialState = {
  convention: null,
  error: null,
};

const newConventionReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default newConventionReducer;
