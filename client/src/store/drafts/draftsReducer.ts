import { AnyAction } from "@reduxjs/toolkit";
import { NEWS_DELETE_SUCCESSFULL } from "../news/newsActionConsts";
import { initialState } from "../rootReducer";
import { DRAFTS_NEWS_FAILURE, DRAFTS_NEWS_SUCCESSFULL } from "./draftsActionConsts";

export function draftsReducer(state = initialState.subscribeNews, action: AnyAction) {
    switch (action.type) {
        case DRAFTS_NEWS_SUCCESSFULL:
            return action.payload;
        case DRAFTS_NEWS_FAILURE:
            return { list: [], offset: 0, limit: 0, total: 0 }
        case NEWS_DELETE_SUCCESSFULL:{
            const arr = state.list.filter(item => item.id !== action.payload);
            return {...state, list: [...arr]}
        }
        default:
            return state;
    }
}