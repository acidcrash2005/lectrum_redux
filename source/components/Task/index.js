// Core
import React, { PureComponent } from 'react';
import cx from "classnames";

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import Star from '../../theme/assets/Star';

export default class Task extends PureComponent {

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    taskInput = React.createRef();

    componentDidUpdate () {
        const { id, taskId } = this.props;

        if (id === taskId) {
            this.taskInput.current.focus();
        }
    }

    _setTaskEditingState = (isEditable) => {
        const { id, _editTaskFocus } = this.props;

        if (isEditable) {
            _editTaskFocus(id);
        } else {
            _editTaskFocus('');
        }

    }

    _updateTask = () => {
        const { _updateTaskAsync, message, newMessage } = this.props;

        if (message !== newMessage) {
            _updateTaskAsync(
                this._getTaskShape({
                    message: newMessage,
                })
            );
        }
        this._setTaskEditingState(false);

        return null;
    }

    _updateNewTaskMessage = (e) => {
        const { _editTaskChange } = this.props;

        _editTaskChange(e.target.value);

    }

    _updateTaskMessageOnClick = () => {
        const { _editTaskChange, id, taskId } = this.props;

        _editTaskChange(this.taskInput.current.value);

        if (id === taskId) {
            this._updateTask();

            return null;
        }

        this._setTaskEditingState(true);
    }

    _cancelUpdatingTaskMessage = () => {

        this._setTaskEditingState(false);

    }

    _updateTaskMessageOnKeyDown = (e) => {
        const { newMessage } = this.props;
        const enterKey = e.key === "Enter";
        const escapeKey = e.key === "Escape";

        if (!newMessage) {
            return null;
        }

        if (enterKey) {
            this._updateTask();
        }

        if (escapeKey) {
            this._cancelUpdatingTaskMessage();
        }
    }

    _toggleTaskCompletedState = () => {
        const { _updateTaskAsync, completed } = this.props;

        _updateTaskAsync(
            this._getTaskShape({
                completed: !completed,
            })
        );
    }

    _toggleTaskFavoriteState = () => {
        const { _updateTaskAsync, favorite } = this.props;

        _updateTaskAsync(
            this._getTaskShape({
                favorite: !favorite,
            })
        );
    }

    _removeTask = () => {
        const { _removeTaskAsync, id } = this.props;

        _removeTaskAsync(id);
    }

    render () {
        const { completed, favorite, message, newMessage, id, taskId } = this.props;

        const style = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { style }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        height = { 25 }
                        width = { 25 }
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        disabled = { id !== taskId }
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { id !== taskId ? message : newMessage }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 19 }
                        width = { 19 }
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        checked = { id === taskId }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 19 }
                        inlineBlock
                        onClick = { this._updateTaskMessageOnClick }
                        width = { 19 }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 17 }
                        width = { 17 }
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
