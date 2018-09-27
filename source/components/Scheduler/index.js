// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Control, actions as actionForm } from 'react-redux-form';
import { bindActionCreators } from 'redux';

// Instruments
import Styles from './styles.m.css';
import Checkbox from '../../theme/assets/Checkbox';
import { sortTasksByGroup } from '../../instruments/helpers';

//Components
import Spinner from '../Spinner';
import Task from '../Task';
import FlipMove from 'react-flip-move';

//Actions
import {
    fetchTasksAsync,
    createTasksAsync,
    updateTasksAsync,
    fillTasks,
    removeTaskAsync,
    completeAllTasksAsync,
    editTaskChange,
    editTaskFocus,
} from '../../bus/tasks/actions';

//Store
const mapProps = (state) => {
    return {
        tasks:           sortTasksByGroup(state.tasks.get('taskList')),
        newTaskMessage:  state.forms.newTask.message,
        tasksFilter:     state.forms.filter.tasksFilter.toLocaleLowerCase(),
        isTasksFetching: state.ui.get('isFetching'),
        newMessage:      state.tasks.getIn(['edit', 'newMessage']),
        taskId:          state.tasks.getIn(['edit', 'taskId']),
    };
};

const mapDispatch = (dispatch) => {
    return {
        actions: bindActionCreators({
            fetchTasksAsync,
            createTasksAsync,
            updateTasksAsync,
            fillTasks,
            removeTaskAsync,
            completeAllTasksAsync,
            resetFrom: actionForm.reset,
            editTaskChange,
            editTaskFocus,
        }, dispatch),
    };
};

export default
@connect(
    mapProps,
    mapDispatch,
)
class Scheduler extends Component {

    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }

    _getAllCompleted = () => {
        const { tasks } = this.props;

        for (const task of tasks) {
            if (!task.get('completed')) {
                return false;
            }
        }

        return true;
    }

    _setTasksFetchingState = (isTasksFetching) => {
        this.setState({ isTasksFetching });
    }

    _createTaskAsync = () => {

        const { actions, newTaskMessage } = this.props;

        if (newTaskMessage) {
            actions.createTasksAsync(newTaskMessage);
            actions.resetFrom('forms.newTask.message');
        }

        return null;

    }

    _updateTaskAsync = (taskProps) => {
        const { actions } = this.props;

        actions.updateTasksAsync(taskProps);

    }

    _removeTaskAsync = (id) => {
        const { actions } = this.props;

        actions.removeTaskAsync(id);
    }

    _completeAllTasksAsync = () => {
        const { tasks, actions } = this.props;

        const notCompletedTasks = tasks.filter((task) => {
            return task.get('completed') === false;
        });

        if (notCompletedTasks.length !== 0) {
            actions.completeAllTasksAsync(notCompletedTasks);
        } else {
            return null;
        }
    }

    render () {
        const {
            tasks,
            tasksFilter,
            isTasksFetching,
            actions,
            newMessage,
            taskId,
        } = this.props;

        const filtredTasks = tasks.filter((task) => {
            return task.get('message').toLocaleLowerCase().includes(tasksFilter);
        });

        const tasksList = tasksFilter ? filtredTasks : tasks;

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Spinner isSpinning = { isTasksFetching } />
                    <header>
                        <h1 className = { Styles.test }>Планировщик задач</h1>
                        <Form model = 'forms.filter'>
                            <Control.text
                                model = 'forms.filter.tasksFilter'
                                placeholder = 'Поиск'
                                type = 'search'
                            />
                        </Form>
                    </header>
                    <section>
                        <Form
                            model = 'forms.newTask'
                            onSubmit = { this._createTaskAsync }>
                            <Control.text
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                model = 'forms.newTask.message'
                                placeholder = 'Описaние моей новой задачи'
                            />
                            <button>
                                Добавить задачу
                            </button>
                        </Form>
                        <div className = { Styles.overlay }>
                            <ul>
                                <FlipMove duration = { 400 }>
                                    { tasksList.map((props) => (
                                        <Task
                                            _editTaskChange = { actions.editTaskChange }
                                            _editTaskFocus = { actions.editTaskFocus }
                                            _editTaskIsEdit = { actions.editTaskIsEdit }
                                            _removeTaskAsync = { this._removeTaskAsync }
                                            _updateTaskAsync = { this._updateTaskAsync }
                                            completed = { props.get('completed') }
                                            favorite = { props.get('favorite') }
                                            id = { props.get('id') }
                                            key = { props.get('id') }
                                            message = { props.get('message') }
                                            newMessage = { newMessage }
                                            taskId = { taskId }
                                        />
                                    )) }
                                </FlipMove>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { this._getAllCompleted() }
                            color1 = '#363636'
                            color2 = '#fff'
                            height = { 25 }
                            width = { 25 }
                            onClick = { this._completeAllTasksAsync }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
