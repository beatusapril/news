import { AnyAction } from "@reduxjs/toolkit";
import { NEWS_DELETE_SUCCESSFULL, NEWS_MARK_AS_READ_SUCCESSFULL } from "../news/newsActionConsts";
import { initialState } from "../rootReducer";
import { SUBSCRIBE_NEWS_FAILURE, SUBSCRIBE_NEWS_RESET, SUBSCRIBE_NEWS_SUCCESSFULL } from "./SubscribeNewsActionConsts";

export function subscribeNewsReducer(state = initialState.subscribeNews, action: AnyAction) {
    switch (action.type) {
        case SUBSCRIBE_NEWS_SUCCESSFULL:
            return action.payload;
        case SUBSCRIBE_NEWS_FAILURE:
            return { list: [], offset: 0, limit: 0, total: 0 }
        case SUBSCRIBE_NEWS_RESET:
            return { list: [], offset: 0, limit: 0, total: 0 }
        case NEWS_MARK_AS_READ_SUCCESSFULL: {
            const arr = state.list.map(item => {
                if (action.payload.ids.includes(item.id)) {
                    item.isRead = true;
                }
                return item;
            })
            return { ...state, list: [...arr] }
        }
        case NEWS_DELETE_SUCCESSFULL:{
            const arr = state.list.filter(item => item.id !== action.payload);
            return {...state, list: [...arr]}
        }
        default:
            return state;
    }
}