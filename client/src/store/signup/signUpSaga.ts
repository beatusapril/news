import { call, put, takeEvery } from "redux-saga/effects";
import { signUpUrl } from "../../api/signUpEndpoint";
import { getUserMe, loginUrl } from "../../api/userEndpoint";
import { LoginResponse, UserRequest, UserResponse } from "../../types/User";
import { loginSuccessfull } from "../login/actionLogin";
import { SIGNUP } from "./actionConsts";
import { signUpFailure } from "./actionSignup";

type Params = { payload: UserRequest, type: string }
function* signUp(args: Params) {
    try {
        const response: string = yield call(fetch, signUpUrl, { method: 'post', body: JSON.stringify(args.payload) });
        if (response === "Created") {
            const response: LoginResponse = yield call(fetch, loginUrl, { method: 'post', body: JSON.stringify(args.payload) });
            yield call(() => localStorage.setItem("auth", response.token ? response.token : ''));
            const token = localStorage.getItem("auth");
            if (token) {
                const responseUser: UserResponse = yield call(fetch, getUserMe, { method: 'get', headers: { 'token': token } });
                yield put(loginSuccessfull(responseUser.me));
            }
        }
    } catch (error) {
        yield put(signUpFailure());
        localStorage.setItem("auth", '');
    }
}

export function* watcherSignUp() {
    yield takeEvery(SIGNUP, signUp);
}