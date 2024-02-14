import {
  FETCH_REGIONS_SUCCESS,
  FETCH_PROVINCES_SUCCESS,
  FETCH_CITIES_SUCCESS,
} from "../actions/locationactions";

const initialState = {
  regions: [],
  provinces: [],
  cities: [],
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REGIONS_SUCCESS:
      return {
        ...state,
        regions: action.payload,
      };
    case FETCH_PROVINCES_SUCCESS:
      return {
        ...state,
        provinces: action.payload,
      };
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.payload,
      };
    default:
      return state;
  }
};

export default locationReducer;
