import { all} from 'redux-saga/effects'
import { watcherFetchMe, watcherLogin, watcherLogout, watcherMeUpdate } from './user/userSaga'
import { watcherCreateNews, watcherDeleteNews, watcherFetchNews, watcherReadNews, watcherUpdateNews } from './news/newsSaga'
import { watcherSignUp } from './signup/signUpSaga'
import { watcherSaveTags, watcherTags } from './tags/TagsSaga'
import { watcherEditRole, watcherUsers } from './users/usersSaga'
import { watcherFetchSubscribeNews } from './subscribeNews/SubscribeNewsSaga'
import { watcherDrafts } from './drafts/draftsSaga'

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
        watcherFetchNews(),
        watcherCreateNews(),
        watcherMeUpdate(),
        watcherFetchSubscribeNews(),
        watcherUpdateNews(),
        watcherReadNews(),
        watcherDeleteNews(),
        watcherDrafts()
    ])
}