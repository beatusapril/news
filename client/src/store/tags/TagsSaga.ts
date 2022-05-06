import { call, put, takeEvery } from "redux-saga/effects";
import { getTagsApi, saveTagsApi } from "../../api/TagsEndpoint";
import { TAGS_FETCH, TAGS_SAVE } from "./TagActionConsts";
import { tagsFetchAction, tagsFetchFailureAction, tagsFetchSuccessfullAction } from "./TagsAction";

function* fetchTags() {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            const response: string[] = yield call(getTagsApi, token);
            yield put(tagsFetchSuccessfullAction(response));
        }
    } catch (error) {
        yield put(tagsFetchFailureAction());
    }
}

export function* watcherTags() {
    yield takeEvery(TAGS_FETCH, fetchTags);
}

type Params = { payload: string[], type: string }
function* saveTags(args: Params) {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            yield call(saveTagsApi, token, args.payload);
            //yield put(tagsFetchAction());
        }
    } catch (error) {
        yield put(tagsFetchAction());
    }
}

export function* watcherSaveTags() {
    yield takeEvery(TAGS_SAVE, saveTags);
}