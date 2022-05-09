import { call, put, takeEvery } from "redux-saga/effects"
import { editMeApi, getLogin, getUser, logoutUrl } from "../../api/userEndpoint";
import { LoginResponse, UserRequest, UserResponse, UserUpdateRequest } from "../../types/User";
import { FETCH_ME, LOGIN, LOGOUT, ME_UPDATE } from "./actionConsts"
import { fetchMeFailure, fetchMeSuccessfull, loginFailure, loginSuccessfull, logoutFailure, logoutSuccesfull, meUpdateSuccessfull } from "./actionUser";

type Params = { payload: UserRequest, type: string }
function* login(args: Params) {
    try {
        const response: LoginResponse= yield call(getLogin, args.payload);
        yield call(() => localStorage.setItem("auth", response.token ? response.token : ''));
        const token = localStorage.getItem("auth");
        if (token) {
            const responseUser: UserResponse = yield call(getUser, token);
            yield put(loginSuccessfull(responseUser.me));
        }
    } catch (error) {
        yield put(loginFailure());
        localStorage.setItem("auth", '');
    }
}

export function* watcherLogin() {
    yield takeEvery(LOGIN, login);
}

function* logout() {
    try {
        yield call(fetch, logoutUrl, { method: 'post' });
        yield call(() => localStorage.setItem("auth", ''));
        yield put(logoutSuccesfull());
    } catch (error) {
        yield put(logoutFailure());
    }
}

export function* watcherLogout() {
    yield takeEvery(LOGOUT, logout);
}

function* fetchMe() {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            const responseUser: UserResponse = yield call(getUser, token);
            yield put(fetchMeSuccessfull(responseUser.me));
        }
    } catch (error) {
        yield put(fetchMeFailure());
    }
}

export function* watcherFetchMe() {
    yield takeEvery(FETCH_ME, fetchMe);
}

type ParamsMeUpdate = {type: string, payload: UserUpdateRequest}
function* meUpdate(args: ParamsMeUpdate) {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            yield call(editMeApi, token, args.payload);
            yield put(meUpdateSuccessfull(args.payload));
        }
    } catch (error) {
        
    }
}

export function* watcherMeUpdate() {
    yield takeEvery(ME_UPDATE, meUpdate);
}