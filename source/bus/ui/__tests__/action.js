//Actions
import * as actions from '../actions';

describe('ui actions:', () => {
    test('startSpinner', () => {
        expect(actions.startSpinner()).toMatchSnapshot();
    });

    test('stopSpinner', () => {
        expect(actions.stopSpinner()).toMatchInlineSnapshot(`
Object {
  "type": "STOP_FETCHING",
}
`);
    });


});
