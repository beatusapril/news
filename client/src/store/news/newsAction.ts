import { AnyAction } from "@reduxjs/toolkit";
import { NewsCreateRequest, NewsRequest, NewsResponse, NewsUpdateRequest, ReadNews } from "../../types/News";
import { NEWS_CREATE, NEWS_DELETE, NEWS_DELETE_SUCCESSFULL, NEWS_FETCH, NEWS_FETCH_FAILURE, NEWS_FETCH_SUCCESSFULL, NEWS_MARK_AS_READ, NEWS_MARK_AS_READ_SUCCESSFULL, NEWS_UPDATE } from "./newsActionConsts";

export function newsFetchAction(request: NewsRequest): AnyAction {
    return { type: NEWS_FETCH, payload: request }
}

export function newsFetchSuccessfull(news: NewsResponse): AnyAction {
    return { type: NEWS_FETCH_SUCCESSFULL, payload: news }
}

export function newsFetchFailure(): AnyAction {
    return { type: NEWS_FETCH_FAILURE }
}

export function newsCreate(news: NewsCreateRequest): AnyAction {
    return { type: NEWS_CREATE, payload: news }
}

export function newsUpdateAction(news: NewsUpdateRequest): AnyAction {
    return { type: NEWS_UPDATE, payload: news }
}

export function newsMarkAsReadAction(news: ReadNews): AnyAction {
    return { type: NEWS_MARK_AS_READ, payload: news }
}

export function newsMarkAsReadSuccessfull(news: ReadNews): AnyAction {
    return { type: NEWS_MARK_AS_READ_SUCCESSFULL, payload: news }
}

export function newsDelete(id: number): AnyAction {
    return { type: NEWS_DELETE, payload: id }
}

export function newsDeleteSuccessfull(id: number): AnyAction {
    return { type: NEWS_DELETE_SUCCESSFULL, payload: id }
}