// Types
import { types } from './types';

//Async
export const fetchTasksAsync = () => ({
    type: types.FETCH_TASKS_ASYNC,
});

export const createTasksAsync = (message) => ({
    type:    types.CREATE_TASKS_ASYNC,
    payload: message,
});

export const updateTasksAsync = (updateTask) => ({
    type:    types.UPDATE_TASKS_ASYNC,
    payload: updateTask,
});

export const removeTaskAsync = (idTask) => ({
    type:    types.REMOVE_TASKS_ASYNC,
    payload: idTask,
});

export const completeAllTasksAsync = (taskList) => ({
    type:    types.COMPLETE_ALL_TASKS_ASYNC,
    payload: taskList,
});

//Sync
export const fillTasks = (tasks) => {
    return {
        type:    types.FILL_TASKS,
        payload: tasks,
    };
};

export const createTasks = (task) => ({
    type:    types.CREATE_TASK,
    payload: task,
});

export const updateTasks = (updateTask) => ({
    type:    types.UPDATE_TASKS,
    payload: updateTask,
});

export const removeTask = (idTask) => ({
    type:    types.REMOVE_TASKS,
    payload: idTask,
});

export const completeAllTasks = (taskList) => ({
    type:    types.COMPLETE_ALL_TASKS,
    payload: taskList,
});

export const editTaskChange = (newMessage) => ({
    type:    types.EDIT_TASK_CHANGE,
    payload: newMessage,
});

export const editTaskFocus = (taskId) => ({
    type:    types.EDIT_TASK_FOCUS,
    payload: taskId,
});

