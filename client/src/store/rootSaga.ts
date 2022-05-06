import { all} from 'redux-saga/effects'
import { watcherFetchMe, watcherLogin, watcherLogout } from './login/loginSaga'
import { watcherSignUp } from './signup/signUpSaga'
import { watcherEditRole, watcherUsers } from './users/usersSaga'

export default function* rootSaga() {
    yield all([
        watcherLogin(),
        watcherLogout(),
        watcherSignUp(),
        watcherUsers(),
        watcherEditRole(),
        watcherFetchMe()
    ])
}