//Core
import { expectSaga } from 'redux-saga-test-plan';
import { apply, put } from 'redux-saga/effects';

//Instruments
import { api } from '../../../API';

//Action
import { fillTasks, fetchTasksAsync } from '../actions';
import { startSpinner, stopSpinner } from '../../ui/actions';

//Worker
import { fetchTasksWorker } from '../saga/workers/fetchTasksWorker';

const action = fetchTasksAsync();

describe('fetchTasksWorker saga:', () => {
    test('should complete scenario', async () => {
        await expectSaga(fetchTasksWorker, action)
            .put(startSpinner())
            .provide([
                [apply(api, api.tasks.fetchTasks), __.updateTask]
            ])
            .apply(api, api.tasks.fetchTasks)
            .put(fillTasks(__.updateTask))
            .put(stopSpinner())
            .run();
    });
});
