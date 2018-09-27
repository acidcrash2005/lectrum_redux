//Core
import { createStore } from 'redux';

//Reducer
import { rootReducer } from './rootReducer';

//RootSaga
import { rootSaga } from './rootSaga';

//Middleware
import { sagaMiddleware, enhancedStore } from './middleware/core';

export const store = createStore(rootReducer, enhancedStore);

sagaMiddleware.run(rootSaga);
