import { AnyAction } from "@reduxjs/toolkit";
import { initialState } from "../rootReducer";
import { SUBSCRIBE_NEWS_FAILURE, SUBSCRIBE_NEWS_SUCCESSFULL } from "./SubscribeNewsActionConsts";

export function subscribeNewsReducer(state = initialState.subscribeNews, action: AnyAction) {
    switch (action.type) {
        case SUBSCRIBE_NEWS_SUCCESSFULL:
            return action.payload;
        case SUBSCRIBE_NEWS_FAILURE:
            return { list: [], offset: 0, limit: 0, total: 0 }
        default:
            return state;
    }
}