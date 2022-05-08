import { call, put, takeEvery } from "redux-saga/effects";
import { createNewsApi, getNewsApi } from "../../api/NewsEndpoint";
import { NewsCreateRequest, NewsRequest, NewsWrapper } from "../../types/News";
import { newsFetchFailure, newsFetchSuccessfull } from "./newsAction";
import { NEWS_CREATE, NEWS_FETCH } from "./newsActionConsts";

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