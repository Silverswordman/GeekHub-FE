import { combineReducers, configureStore } from "@reduxjs/toolkit";
import conventionsReducer from "../reducers/conventionreducer";

const myReducer = combineReducers({
  conventions: conventionsReducer,
});

const store = configureStore({
  reducer: myReducer,
});

export default store;
