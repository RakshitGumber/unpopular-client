import { combineReducers } from "redux";
import userReducer from "./user";
import friendsReducer from "./followers";

export default combineReducers({ userReducer, friendsReducer });
