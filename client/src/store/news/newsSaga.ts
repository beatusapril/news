import { call, put, takeEvery } from "redux-saga/effects";
import { createNewsApi, getNewsApi, updateNewsApi } from "../../api/NewsEndpoint";
import { NewsCreateRequest, NewsRequest, NewsUpdateRequest, NewsWrapper } from "../../types/News";
import { newsFetchFailure, newsFetchSuccessfull } from "./newsAction";
import { NEWS_CREATE, NEWS_FETCH, NEWS_UPDATE } from "./newsActionConsts";

type Params = { payload: NewsRequest, type: string }
function* fetchNews(args: Params) {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            const response: NewsWrapper = yield call(getNewsApi, token, args.payload);
            yield put(newsFetchSuccessfull(response.news));
        }
    } catch (error) {
        yield put(newsFetchFailure());
    }
}

export function* watcherFetchNews() {
    yield takeEvery(NEWS_FETCH, fetchNews);
}

type ParamsNewsCreate = { payload: NewsCreateRequest, type: string }
function* createNews(args: ParamsNewsCreate) {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            yield call(createNewsApi, token, args.payload);
        }
    } catch (error) {
    }
}

export function* watcherCreateNews() {
    yield takeEvery(NEWS_CREATE, createNews);
}

type ParamsNewsUpdate = { payload: NewsUpdateRequest, type: string }
function* updateNews(args: ParamsNewsUpdate) {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            yield call(updateNewsApi, token, args.payload);
        }
    } catch (error) {
    }
}

export function* watcherUpdateNews() {
    yield takeEvery(NEWS_UPDATE, updateNews);
}