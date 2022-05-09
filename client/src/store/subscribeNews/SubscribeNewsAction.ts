import { AnyAction } from "@reduxjs/toolkit";
import { NewsRequest, NewsResponse } from "../../types/News";
import { SUBSCRIBE_NEWS_FAILURE, SUBSCRIBE_NEWS_FETCH, SUBSCRIBE_NEWS_SUCCESSFULL } from "./SubscribeNewsActionConsts";

export function fetchSubscribeNewsAction(filter: NewsRequest) {
    return { type: SUBSCRIBE_NEWS_FETCH, payload: filter }
}

export function fetchSubscribeNewsSuccessfull(news: NewsResponse): AnyAction {
    return { type: SUBSCRIBE_NEWS_SUCCESSFULL, payload: news }
}

export function fetchSubscribeNewsFailure(): AnyAction {
    return { type: SUBSCRIBE_NEWS_FAILURE }
}