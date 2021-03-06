// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';


//Store
import { store } from './init/store';

// Instruments
import './theme/init';

// App
import App from './pages/App';

render(
    <Provider store = { store }>
        <App />
    </Provider>,
    document.getElementById('app'),
);
