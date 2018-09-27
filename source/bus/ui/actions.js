// Types
import { types } from './types';

export const startSpinner = () => {
    return {
        type: types.START_FETCHING,
    };
};

export const stopSpinner = () => {
    return {
        type: types.STOP_FETCHING,
    };
};

