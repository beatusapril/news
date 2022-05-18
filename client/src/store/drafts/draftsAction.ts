import { AnyAction } from "@reduxjs/toolkit"
import { NewsRequest, NewsResponse } from "../../types/News"
import { DRAFTS_NEWS_FAILURE, DRAFTS_NEWS_FETCH, DRAFTS_NEWS_SUCCESSFULL } from "./draftsActionConsts"

export function fetchDraftsNewsAction(filter: NewsRequest): AnyAction {
    return { type: DRAFTS_NEWS_FETCH, payload: filter }
}

export function fetchDraftsNewsSuccessfull(news: NewsResponse): AnyAction {
    return { type: DRAFTS_NEWS_SUCCESSFULL, payload: news }
}

export function fetchDraftsNewsFailure(): AnyAction {
    return { type: DRAFTS_NEWS_FAILURE }
}