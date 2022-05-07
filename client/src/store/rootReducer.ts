import { combineReducers } from "@reduxjs/toolkit";
import { userInfo } from "os";
import { loginReducer } from "./login/loginReducer";
import { newsReducer } from "./news/newsReducer";
import { signUpReducer } from "./signup/signUpReducer";
import { tagsReducer } from "./tags/TagsReducer";
import { Store } from "./Types";
import { usersReducer } from "./users/usersReducer";

export const initialState:Store = {
    user: null,
    users: [],
    tags: [],
    news: {list: [], offset: 0, total: 0, limit: 0}
}

export const rootReducer = combineReducers({user: loginReducer, 
    users: usersReducer, 
    tags: tagsReducer,
    news: newsReducer});