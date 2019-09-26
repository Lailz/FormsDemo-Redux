import { combineReducers } from "redux";

import peopleReducer from "./people";

const rootReducer = combineReducers({
  rootPeople: peopleReducer
});

export default rootReducer;
