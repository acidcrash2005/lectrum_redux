//Core
import { all, call } from 'redux-saga/effects';

//Watcher
import { watchTasks } from '../bus/tasks/saga/wtchers';

export function* rootSaga () {
    yield all([call(watchTasks)]);
}
