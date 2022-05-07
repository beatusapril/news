import { call, put, takeEvery } from "redux-saga/effects";
import { getNewsApi } from "../../api/NewsEndpoint";
import { NewsRequest, NewsResponse, NewsWrapper } from "../../types/News";
import { newsFetchFailure, newsFetchSuccessfull } from "./newsAction";
import { NEWS_FETCH } from "./newsActionConsts";

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