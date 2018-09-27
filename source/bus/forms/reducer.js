//Core
import { combineForms } from 'react-redux-form';

export const formsReducer = combineForms({
    newTask: {
        message: '',
    },
    filter: {
        tasksFilter: '',
    },
}, 'forms');
