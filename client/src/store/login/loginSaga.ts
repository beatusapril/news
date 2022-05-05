import { call, takeEvery } from "redux-saga/effects"
import { UserRequest } from "../../types/User";
import { LOGIN } from "./actionConsts"

type Params = { args: UserRequest, type: string}
function* login(args: Params){
    const response: string = yield call(fetch, '', {method: 'post', body: JSON.stringify(args.args)})
}

export function* watcherLogin(){
    yield takeEvery(LOGIN, login);
}