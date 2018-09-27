//Core
import { apply, put } from 'redux-saga/effects';

//Instruments
import { api } from '../../../../API';

//Action
import { startSpinner, stopSpinner } from '../../../ui/actions';
import { completeAllTasks } from '../../../tasks/actions';


export function* completeAllTasksWorker ({ payload: taskList }) {
    try {
        yield put(startSpinner());

        const completedTaskLis = yield taskList.map((task) => task.update('completed', () => true));

        yield apply(api, api.tasks.completeAllTasks, [completedTaskLis]);

        yield put(completeAllTasks(completedTaskLis));

    } catch (error) {
        console.log('updateTasksWorker', error);
    } finally {
        yield put(stopSpinner());
    }
}
