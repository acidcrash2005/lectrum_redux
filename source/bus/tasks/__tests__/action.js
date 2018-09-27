//Actions
import * as actions from '../actions';

//Types
import { types } from '../types';

describe('auth actions:', () => {
    test('fetchTasksAsync', () => {
        expect(actions.fetchTasksAsync()).toEqual({
            type: types.FETCH_TASKS_ASYNC,
        });
    });

    test('createTasksAsync', () => {
        expect(actions.createTasksAsync(__.testMessage)).toEqual({
            type:    types.CREATE_TASKS_ASYNC,
            payload: __.testMessage,
        });
    });

    test('updateTasksAsync', () => {
        expect(actions.updateTasksAsync(__.updateTask)).toEqual({
            type:    types.UPDATE_TASKS_ASYNC,
            payload: __.updateTask,
        });
    });

    test('updateTasksAsync', () => {
        expect(actions.updateTasksAsync(__.updateTask)).toEqual({
            type:    types.UPDATE_TASKS_ASYNC,
            payload: __.updateTask,
        });
    });

    test('removeTaskAsync', () => {
        expect(actions.removeTaskAsync(__.updateTask.id)).toEqual({
            type:    types.REMOVE_TASKS_ASYNC,
            payload: __.updateTask.id,
        });
    });

    test('completeAllTasksAsync', () => {
        expect(actions.completeAllTasksAsync(__.updateTask)).toEqual({
            type:    types.COMPLETE_ALL_TASKS_ASYNC,
            payload: __.updateTask,
        });
    });

    test('fillTasks', () => {
        expect(actions.fillTasks(__.updateTask)).toEqual({
            type:    types.FILL_TASKS,
            payload: __.updateTask,
        });
    });

    test('createTasks', () => {
        expect(actions.createTasks(__.updateTask)).toEqual({
            type:    types.CREATE_TASK,
            payload: __.updateTask,
        });
    });

    test('updateTasks', () => {
        expect(actions.updateTasks(__.updateTask)).toEqual({
            type:    types.UPDATE_TASKS,
            payload: __.updateTask,
        });
    });

    test('removeTask', () => {
        expect(actions.removeTask(__.updateTask.id)).toEqual({
            type:    types.REMOVE_TASKS,
            payload: __.updateTask.id,
        });
    });

    test('completeAllTasks', () => {
        expect(actions.completeAllTasks(__.updateTask)).toEqual({
            type:    types.COMPLETE_ALL_TASKS,
            payload: __.updateTask,
        });
    });

    test('editTaskChange', () => {
        expect(actions.editTaskChange(__.testMessage)).toEqual({
            type:    types.EDIT_TASK_CHANGE,
            payload: __.testMessage,
        });
    });

    test('editTaskFocus', () => {
        expect(actions.editTaskFocus(__.updateTask.id)).toEqual({
            type:    types.EDIT_TASK_FOCUS,
            payload: __.updateTask.id,
        });
    });
});
