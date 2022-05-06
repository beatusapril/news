import { combineReducers } from "@reduxjs/toolkit";
import { userInfo } from "os";
import { loginReducer } from "./login/loginReducer";
import { signUpReducer } from "./signup/signUpReducer";
import { Store } from "./Types";
import { usersReducer } from "./users/usersReducer";

export const initialState:Store = {
    user: null,
    users: []
}

export const rootReducer = combineReducers({user: loginReducer, users: usersReducer});