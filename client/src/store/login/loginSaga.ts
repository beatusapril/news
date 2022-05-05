import { call, put, takeEvery } from "redux-saga/effects"
import { getUserMe, loginUrl, logoutUrl } from "../../api/userEndpoint";
import { LoginResponse, UserRequest, UserResponse } from "../../types/User";
import { LOGIN, LOGOUT } from "./actionConsts"
import { loginFailure, loginSuccessfull, logoutFailure, logoutSuccesfull } from "./actionLogin";

async function getApi(user: UserRequest) {
    const result = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(user)
    })
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });
  
    return result;
}

type Params = { payload: UserRequest, type: string }
function* login(args: Params) {
    try {
        const response: LoginResponse= yield call(getApi, args.payload);
        yield call(() => localStorage.setItem("auth", response.token ? response.token : ''));
        const token = localStorage.getItem("auth");
        if (token) {
            const responseUser: UserResponse = yield call(fetch, getUserMe, { method: 'get', headers: { 'token': token } });
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