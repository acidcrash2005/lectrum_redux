//Core
import { apply, put } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';


//Action
import { createTasks } from '../../actions';
import { startSpinner, stopSpinner } from '../../../ui/actions';


export function* createTasksWorker ({ payload: message }) {
    try {
        yield put(startSpinner());

        const task = yield apply(api, api.tasks.createTask, [message]);

        yield put(createTasks(task));
    } catch (error) {
        console.log('fetchTasksWorker', error);
    } finally {
        yield put(stopSpinner());
    }
}
