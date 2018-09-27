//Core
import { fromJS, List, Map } from 'immutable';

//Reducer
import { getIndex, tasksReducer } from '../reducer';

//Actions
import * as taskActions from '../actions';

const initialState = Map({
    taskList: List(),
    edit:     Map({
        taskId:     '',
        newMessage: '',
        isEditing:  '',
    }),
});

describe('task reducer:', () => {
    test('should return state by default', () => {
        expect(tasksReducer(void 0, { type: __.testAction })).toEqual(
            initialState,
        );
    });

    test('should handle FILL_TASKS action', () => {
        expect(tasksReducer(void 0, taskActions.fillTasks(__.updateTask))).toEqual(
            initialState.set('taskList', fromJS(__.updateTask))
        );
    });

    test('should handle CREATE_TASK action', () => {
        expect(tasksReducer(void 0, taskActions.createTasks(__.updateTask))).toEqual(
            initialState.updateIn(['taskList'], (taskList) => taskList.unshift(fromJS(__.updateTask)))
        );
    });

    test('should handle UPDATE_TASKS action', () => {
        expect(tasksReducer(void 0, taskActions.updateTasks(fromJS(__.updateTask)))).toEqual(
            initialState.updateIn(['taskList'], (taskList) => taskList.map((task, index) => {
                return task;
            }))
        );
    });

    test('should handle REMOVE_TASKS action', () => {
        expect(tasksReducer(void 0, taskActions.removeTask(fromJS(__.updateTask)))).toEqual(
            initialState.updateIn(['taskList'], (taskList) => {
                return taskList.filter((task) => task.get('id') !== fromJS(__.updateTask));
            })
        );
    });

    test('should handle COMPLETE_ALL_TASKS action', () => {
        expect(tasksReducer(void 0, taskActions.completeAllTasks(fromJS(__.updateTask)))).toEqual(
            initialState.updateIn(['taskList'], (taskList) => {
                return taskList.map((task) => {
                    return task.merge(
                        fromJS(__.updateTask).find((item) => item.get('id') === task.get('id'))
                    );
                });
            })
        );
    });

    test('should handle EDIT_TASK_CHANGE action', () => {
        expect(tasksReducer(void 0, taskActions.editTaskChange(__.testMessage))).toEqual(
            initialState.updateIn(['edit', 'newMessage'], () => __.testMessage)
        );
    });

    test('should handle EDIT_TASK_FOCUS action', () => {
        expect(tasksReducer(void 0, taskActions.editTaskFocus(__.updateTask.id))).toEqual(
            initialState.updateIn(['edit', 'taskId'], () => __.updateTask.id)
        );
    });

});
