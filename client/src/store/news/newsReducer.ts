import { AnyAction } from "@reduxjs/toolkit";
import { initialState } from "../rootReducer";
import { NEWS_DELETE_SUCCESSFULL, NEWS_FETCH_FAILURE, NEWS_FETCH_SUCCESSFULL, NEWS_MARK_AS_READ_SUCCESSFULL } from "./newsActionConsts";

export function newsReducer(state = initialState.news, action: AnyAction) {
    switch (action.type) {
        case NEWS_FETCH_SUCCESSFULL:
            return action.payload;
        case NEWS_FETCH_FAILURE:
            return { list: [], offset: 0, limit: 0, total: 0 }
        case NEWS_MARK_AS_READ_SUCCESSFULL:{
            const arr = state.list.map(item => {
                if (action.payload.ids.includes(item.id)){
                    item.isRead = true;
                }
                return item;
            })
            return {...state, list: [...arr]}
        }
        case NEWS_DELETE_SUCCESSFULL:{
            const arr = state.list.filter(item => item.id !== action.payload);
            return {...state, list: [...arr]}
        }
        default:
            return state;
    }
}