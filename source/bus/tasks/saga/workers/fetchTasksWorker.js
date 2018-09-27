//Core
import { apply, put } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Action
import { fillTasks } from '../../actions';
import { startSpinner, stopSpinner } from '../../../ui/actions';


export function* fetchTasksWorker () {
    try {
        yield put(startSpinner());

        const tasks = yield apply(api, api.tasks.fetchTasks);

        yield put(fillTasks(tasks));
    } catch (error) {
        console.log('fetchTasksWorker', error);
    } finally {
        yield put(stopSpinner());
    }
}
