//Core
import { Map, List, fromJS } from 'immutable';

// Types
import { types } from './types';

const initialState = Map({
    taskList: List(),
    edit:     Map({
        taskId:     '',
        newMessage: '',
        isEditing:  '',
    }),
});

export const getIndex = (taskList, action) => {
    return taskList.findIndex(
        (task) => task.get('id') === action.payload.id
    );
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
            return state.set('taskList', fromJS(action.payload));

        case types.CREATE_TASK:
            return state.updateIn(['taskList'], (taskList) => taskList.unshift(fromJS(action.payload)));

        case types.UPDATE_TASKS:
            return state.updateIn(['taskList'], (taskList) => taskList.map((task, index) => {

                if (index === getIndex(state.get('taskList'), action)) {
                    return task.merge(fromJS(action.payload));
                }

                return task;
            }));

        case types.REMOVE_TASKS:
            return state.updateIn(['taskList'], (taskList) => {
                return taskList.filter((task) => task.get('id') !== action.payload);
            });

        case types.COMPLETE_ALL_TASKS:
            return state.updateIn(['taskList'], (taskList) => {
                return taskList.map((task) => {
                    return task.merge(
                        action.payload.find((item) => item.get('id') === task.get('id'))
                    );
                });
            });

        case types.EDIT_TASK_CHANGE:
            return state.updateIn(['edit', 'newMessage'], () => action.payload);

        case types.EDIT_TASK_FOCUS:
            return state.updateIn(['edit', 'taskId'], () => action.payload);


        default:
            return state;
    }
};
