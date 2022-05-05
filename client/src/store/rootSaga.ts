import { all} from 'redux-saga/effects'
import { watcherLogin, watcherLogout } from './login/loginSaga'
import { watcherSignUp } from './signup/signUpSaga'

export default function* rootSaga() {
    yield all([
        watcherLogin(),
        watcherLogout(),
        watcherSignUp()
    ])
}