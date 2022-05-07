import { AnyAction } from "@reduxjs/toolkit";
import { initialState } from "../rootReducer";
import { NEWS_FETCH_FAILURE, NEWS_FETCH_SUCCESSFULL } from "./newsActionConsts";

export function newsReducer(state = initialState.news, action: AnyAction) {
    switch (action.type) {
        case NEWS_FETCH_SUCCESSFULL:
            return action.payload;
        case NEWS_FETCH_FAILURE:
            return { list: [], offset: 0, limit: 0, total: 0 }
        default:
            return state;
    }
}