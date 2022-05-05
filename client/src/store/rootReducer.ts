import { combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "./login/loginReducer";
import { signUpReducer } from "./signup/signUpReducer";
import { Store } from "./Types";

export const initialState:Store = {
    user: null
}

export const rootReducer = combineReducers({loginReducer: loginReducer, signUpReducer: signUpReducer});