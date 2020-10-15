//Combinacion de todos los reducers
// Auth, Calendario, UI

import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
   ui: uiReducer,
   calendar: calendarReducer
   //TODO: AuthReducer
});
