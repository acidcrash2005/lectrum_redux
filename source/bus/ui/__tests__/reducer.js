//Reducer
import { uiReducer } from '../reducer';

//Actions
import * as uiActions from '../actions';

describe('auth ui:', () => {
    test('should return state by default', () => {
        expect(uiReducer(void 0, { type: __.testAction })).toMatchSnapshot();
    });

    test('should handle START_FETCHING action', () => {
        expect(uiReducer(void 0, uiActions.startSpinner())).toMatchSnapshot();
    });

    test('should handle STOP_FETCHING action', () => {
        expect(uiReducer(void 0, uiActions.startSpinner())).toMatchSnapshot();
    });

});
