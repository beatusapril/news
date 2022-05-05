import { combineReducers } from "@reduxjs/toolkit";
import { Store } from "./Types";

export const initialState:Store = {
    user: null
}

export const rootReducer = combineReducers({});