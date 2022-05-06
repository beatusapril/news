import { combineReducers } from "@reduxjs/toolkit";
import { userInfo } from "os";
import { loginReducer } from "./login/loginReducer";
import { signUpReducer } from "./signup/signUpReducer";
import { tagsReducer } from "./tags/TagsReducer";
import { Store } from "./Types";
import { usersReducer } from "./users/usersReducer";

export const initialState:Store = {
    user: null,
    users: [],
    tags: []
}

export const rootReducer = combineReducers({user: loginReducer, users: usersReducer, tags: tagsReducer});