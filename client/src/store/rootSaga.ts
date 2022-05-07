import { all} from 'redux-saga/effects'
import { watcherFetchMe, watcherLogin, watcherLogout } from './login/loginSaga'
import { watcherFetchNews } from './news/newsSaga'
import { watcherSignUp } from './signup/signUpSaga'
import { watcherSaveTags, watcherTags } from './tags/TagsSaga'
import { watcherEditRole, watcherUsers } from './users/usersSaga'

export default function* rootSaga() {
    yield all([
        watcherLogin(),
        watcherLogout(),
        watcherSignUp(),
        watcherUsers(),
        watcherEditRole(),
        watcherFetchMe(),
        watcherSaveTags(),
        watcherTags(),
        watcherFetchNews()
    ])
}