import { combineReducers, configureStore } from "@reduxjs/toolkit";
import conventionReducer from "../reducers/conventions";
import conventionDetailReducer from "../reducers/convention_details";
import personalProfileReducer from "../reducers/personalprofile";
import authReducer from "../reducers/authslice";
import conventionSectionsReducer from "../reducers/conventionsections";
import registerReducer from "../reducers/register";
import locationReducer from "../reducers/location";
import newConventionReducer from "../reducers/newconvention";
import sectionDetailReducer from "../reducers/section_details";
import subsectionsReducer from "../reducers/subsections";
import newSubsectionReducer from "../reducers/newsubsection";
import requestsReducer from "../reducers/requests";
import usersReducer from "../reducers/users";

const rootReducer = combineReducers({
  conventions: conventionReducer,
  conventionDetails: conventionDetailReducer,
  conventionSections: conventionSectionsReducer,
  personalProfile: personalProfileReducer,
  auth: authReducer,
  register: registerReducer,
  location: locationReducer,
  newConvention: newConventionReducer,
  sectionDetails: sectionDetailReducer,
  subsections: subsectionsReducer,
  requests: requestsReducer,
  subsection: newSubsectionReducer,
  users: usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
