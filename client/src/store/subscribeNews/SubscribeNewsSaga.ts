import { call, put, takeEvery } from "redux-saga/effects";
import { getNewsApi } from "../../api/NewsEndpoint";
import { NewsRequest, NewsWrapper } from "../../types/News";
import { fetchSubscribeNewsFailure, fetchSubscribeNewsSuccessfull } from "./SubscribeNewsAction";
import { SUBSCRIBE_NEWS_FETCH } from "./SubscribeNewsActionConsts";
import {toastr} from 'react-redux-toastr'

type Params = { payload: NewsRequest, type: string }
function* fetchSubscribeNews(args: Params) {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            const response: NewsWrapper = yield call(getNewsApi, token, args.payload);
            yield put(fetchSubscribeNewsSuccessfull(response.news));
        }
    } catch (error) {
        yield put(fetchSubscribeNewsFailure());
        toastr.error('Error', String(error));
    }
}

export function* watcherFetchSubscribeNews() {
    yield takeEvery(SUBSCRIBE_NEWS_FETCH, fetchSubscribeNews);
}