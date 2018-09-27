//Core
import { apply, put } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Action
import { startSpinner, stopSpinner } from '../../../ui/actions';
import { updateTasks } from '../../../tasks/actions';


export function* updateTasksWorker ({ payload: updateTask }) {
    try {
        yield put(startSpinner());

        yield apply(api, api.tasks.updateTask, [updateTask]);

        yield put(updateTasks(updateTask));

    } catch (error) {
        console.log('updateTasksWorker', error);
    } finally {
        yield put(stopSpinner());
    }
}
