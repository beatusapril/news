import { AnyAction } from "@reduxjs/toolkit";
import { NewsCreateRequest, NewsRequest, NewsResponse, NewsUpdateRequest } from "../../types/News";
import { NEWS_CREATE, NEWS_FETCH, NEWS_FETCH_FAILURE, NEWS_FETCH_SUCCESSFULL, NEWS_UPDATE } from "./newsActionConsts";

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