import { AnyAction } from "@reduxjs/toolkit";
import { NewsRequest, NewsResponse } from "../../types/News";
import { NEWS_FETCH, NEWS_FETCH_FAILURE, NEWS_FETCH_SUCCESSFULL } from "./newsActionConsts";

export function newsFetchAction(request: NewsRequest): AnyAction {
    return { type: NEWS_FETCH, payload: request }
}

export function newsFetchSuccessfull(news: NewsResponse): AnyAction {
    return { type: NEWS_FETCH_SUCCESSFULL, payload: news }
}

export function newsFetchFailure(): AnyAction {
    return { type: NEWS_FETCH_FAILURE }
}