import { combineReducers } from "redux";
import userReducer from "./user";
import friendsReducer from "./followers";
import postReducer from "./posts";

export default combineReducers({ userReducer, friendsReducer, postReducer });
