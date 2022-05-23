import { call, put, takeEvery } from "redux-saga/effects";
import { EditRoleParams } from "../../types/User";
import { editRoleApiCall,   getUsersApi} from "../../api/UserEndpoint";
import {UserInfo } from "../../types/User";
import { fetchUsersAction, fetchUsersFailure, fetchUsersSuccesfull } from "./usersAction";
import { EDIT_ROLE, FETCH_USERS } from "./usersActionConsts";

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