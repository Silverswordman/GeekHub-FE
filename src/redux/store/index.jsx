import { combineReducers, configureStore } from "@reduxjs/toolkit";
import conventionReducer from "../reducers/conventions";
import conventionDetailReducer from "../reducers/convention_details";
import personalProfileReducer from "../reducers/personalprofile";
import authReducer from "../reducers/authslice";

const rootReducer = combineReducers({
  conventions: conventionReducer,
  conventionDetails: conventionDetailReducer,
  personalProfile: personalProfileReducer,
  auth: authReducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
