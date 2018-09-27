//Core
import { expectSaga } from 'redux-saga-test-plan';
import { apply, put } from 'redux-saga/effects';

//Instruments
import { api } from '../../../API';

//Action
import { createTasks, createTasksAsync } from '../actions';
import { startSpinner, stopSpinner } from '../../ui/actions';

//Worker
import { createTasksWorker } from '../saga/workers/createTasksWorker';

const action = createTasksAsync(__.testMessage);

describe('createTasksWorker saga:', () => {
    test('should complete scenario', async () => {
        await expectSaga(createTasksWorker, action)
            .put(startSpinner())
            .provide([
                [apply(api, api.tasks.createTask, [__.testMessage]), __.updateTask]
            ])
            .apply(api, api.tasks.createTask, [__.testMessage])
            .put(createTasks(__.updateTask))
            .put(stopSpinner())
            .run();
    });
});
