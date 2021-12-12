import { combineReducers } from "redux";
import sports from "./sports";
import events from "./events";
import outcomes from "./outcomes";

export default combineReducers({
  sports,
  events,
  outcomes
});
