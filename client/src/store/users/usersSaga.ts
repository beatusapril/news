import { call, put, takeEvery } from "redux-saga/effects";
import { EditRoleParams } from "../../api/requset/UserRequsetEntity";
import { signUpUrl } from "../../api/signUpEndpoint";
import { editRoleApiCall,  getLogin, getUser, getUserMe, getUsersApi, loginUrl, signupApi } from "../../api/userEndpoint";
import { LoginResponse, UserInfo, UserRequest, UserResponse } from "../../types/User";
import { loginSuccessfull } from "../login/actionLogin";
import { fetchUsersAction, fetchUsersFailure, fetchUsersSuccesfull } from "./usersAction";
import { EDIT_ROLE, FETCH_ME, FETCH_USERS } from "./usersActionConsts";

function* fetchUsers() {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            const response: UserInfo[] = yield call(getUsersApi, token);
            yield put(fetchUsersSuccesfull(response));
        }
    } catch (error) {
        yield put(fetchUsersFailure());
    }
}

export function* watcherUsers() {
    yield takeEvery(FETCH_USERS, fetchUsers);
}

type Params = { payload: EditRoleParams, type: string }
function* editRole(args: Params) {
    try {
        const token = localStorage.getItem("auth");
        if (token) {
            yield call(editRoleApiCall, token, args.payload.role, args.payload.id);
            yield put(fetchUsersAction());
        }
    } catch (error) {
        
    }
}

export function* watcherEditRole() {
    yield takeEvery(EDIT_ROLE, editRole);
}