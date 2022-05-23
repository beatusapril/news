import { call, put, takeEvery } from "redux-saga/effects";
import { getLogin, getUser, getUserMe, loginUrl, signupApi } from "../../api/UserEndpoint";
import { LoginResponse, UserRequest, UserResponse } from "../../types/User";
import { clearErrorAction, setErrorAction } from "../error/errorAction";
import { loginSuccessfull } from "../user/actionUser";
import { SIGNUP } from "./actionConsts";
import { signUpFailure } from "./actionSignup";

type Params = { payload: UserRequest, type: string }
function* signUp(args: Params) {
    try {
        const response: string = yield call(signupApi, args.payload);
        if (response === "Created") {
            const response: LoginResponse = yield call(getLogin, args.payload);
            yield call(() => localStorage.setItem("auth", response.token ? response.token : ''));
            const token = localStorage.getItem("auth");
            if (token) {
                yield put(clearErrorAction());
                const responseUser: UserResponse = yield call(getUser, token);
                yield put(loginSuccessfull(responseUser.me));
            }
        }
    } catch (error) {
        yield put(signUpFailure());
        yield put(setErrorAction(String(error)));
        localStorage.setItem("auth", '');
    }
}

export function* watcherSignUp() {
    yield takeEvery(SIGNUP, signUp);
}