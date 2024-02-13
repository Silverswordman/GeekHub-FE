import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../actions/registeractions";

const initialState = {
  userId: "",
  loading: false,
  error: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_SUCCESS:
      return { ...state, userId:action.payload, loading: false, error: null };
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default registerReducer;
