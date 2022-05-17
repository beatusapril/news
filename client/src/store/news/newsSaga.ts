import { call, put, takeEvery } from "redux-saga/effects";
import { createNewsApi, deleteNewsApi, getNewsApi, markAsReadApi, updateNewsApi } from "../../api/NewsEndpoint";
import { NewsCreateRequest, NewsRequest, NewsUpdateRequest, NewsWrapper, ReadNews } from "../../types/News";
import { newsDeleteSuccessfull, newsFetchFailure, newsFetchSuccessfull, newsMarkAsReadSuccessfull } from "./newsAction";
import { NEWS_CREATE, NEWS_DELETE, NEWS_FETCH, NEWS_MARK_AS_READ, NEWS_UPDATE } from "./newsActionConsts";

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

type ParamsNewsRead = { payload: ReadNews, type: string }
function* updateReadNews(args: ParamsNewsRead) {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            yield call(markAsReadApi, token, args.payload);
            yield put(newsMarkAsReadSuccessfull(args.payload));
        }
    } catch (error) {
        console.log(error);
    }
}

export function* watcherReadNews() {
    yield takeEvery(NEWS_MARK_AS_READ, updateReadNews);
}

type ParamsNewsDelete = { payload: number, type: string }
function* deleteNews(args: ParamsNewsDelete) {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            yield call(deleteNewsApi, token, args.payload);
            yield put(newsDeleteSuccessfull(args.payload));
        }
    } catch (error) {
        console.log(error);
    }
}

export function* watcherDeleteNews() {
    yield takeEvery(NEWS_DELETE, deleteNews);
}