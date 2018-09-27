//Core
import { takeEvery } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { fetchTasksWorker } from './workers/fetchTasksWorker';
import { createTasksWorker } from './workers/createTasksWorker';
import { updateTasksWorker } from './workers/updateTasksWorker';
import { removeTaskWorker } from './workers/removeTaskWorker';
import { completeAllTasksWorker } from './workers/completeAllTasksWorker';

export function* watchTasks () {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasksWorker);
    yield takeEvery(types.CREATE_TASKS_ASYNC, createTasksWorker);
    yield takeEvery(types.UPDATE_TASKS_ASYNC, updateTasksWorker);
    yield takeEvery(types.REMOVE_TASKS_ASYNC, removeTaskWorker);
    yield takeEvery(types.COMPLETE_ALL_TASKS_ASYNC, completeAllTasksWorker);
}
