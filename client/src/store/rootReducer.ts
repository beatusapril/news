import { combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "./user/userReducer";
import { newsReducer } from "./news/newsReducer";
import { tagsReducer } from "./tags/TagsReducer";
import { Store } from "./Types";
import { usersReducer } from "./users/usersReducer";
import { subscribeNewsReducer } from "./subscribeNews/SubscribeNewsReducer";
import { draftsReducer } from "./drafts/draftsReducer";
import { errorReducer } from "./error/errorReducer";
import {reducer as toastrReducer} from 'react-redux-toastr'

export const initialState:Store = {
    user: null,
    users: [],
    tags: [],
    news: {list: [], offset: 0, total: 0, limit: 0},
    subscribeNews: {list: [], offset: 0, total: 0, limit: 0},
    drafts: {list: [], offset: 0, total: 0, limit: 0},
    error: ''
}

export const rootReducer = combineReducers({user: loginReducer, 
    users: usersReducer, 
    tags: tagsReducer,
    news: newsReducer,
    subscribeNews:subscribeNewsReducer,
    drafts: draftsReducer,
    error: errorReducer,
    toastr: toastrReducer
});