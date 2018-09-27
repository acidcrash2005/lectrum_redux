// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//Components
import { Scheduler } from '../../components';


@hot(module)
export default class App extends Component {
    render () {
        return (
            <Scheduler />
        );
    }
}
