//Core
import { apply, put } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Action
import { startSpinner, stopSpinner } from '../../../ui/actions';
import { removeTask } from '../../../tasks/actions';


export function* removeTaskWorker ({ payload: idTask }) {
    try {
        yield put(startSpinner());

        yield apply(api, api.tasks.removeTask, [idTask]);

        yield put(removeTask(idTask));

    } catch (error) {
        console.log('removeTasksWorker', error);
    } finally {
        yield put(stopSpinner());
    }
}
