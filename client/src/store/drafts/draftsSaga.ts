import { call, put, takeEvery } from "redux-saga/effects";
import { getNewsApi } from "../../api/NewsEndpoint";
import { NewsRequest, NewsWrapper } from "../../types/News";
import { fetchDraftsNewsFailure, fetchDraftsNewsSuccessfull } from "./draftsAction";
import { DRAFTS_NEWS_FETCH } from "./draftsActionConsts";

type Params = { payload: NewsRequest, type: string }
function* fetchDrafts(args: Params) {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            const response: NewsWrapper = yield call(getNewsApi, token, args.payload);
            yield put(fetchDraftsNewsSuccessfull(response.news));
        }
    } catch (error) {
        yield put(fetchDraftsNewsFailure());
    }
}

export function* watcherDrafts() {
    yield takeEvery(DRAFTS_NEWS_FETCH, fetchDrafts);
}