import React, { Component } from 'react';
import TodoListItem from './TodoListItem';
import { connect } from 'react-redux';
import Actions from "../Actions";

const ENTER_BUTTON = 'Enter';

class TodoList extends Component
{
    addNewTask = () =>
    {
        if (this.newTaskInput.value.trim()) {
            this.props.onAddNewTask(this.newTaskInput.value.trim());
            this.newTaskInput.value = '';
        }
    };

    handleKeyPress = (event) =>
    {
        if (event.key === ENTER_BUTTON) {
            this.addNewTask();
        }
    };

    render() {
        return (
            <div className="todolist">
                <div className="todolist__new-todo">
                    <input className="todolist__new-todo-input" onKeyPress={this.handleKeyPress} ref={ (input) => { this.newTaskInput = input }} placeholder="New task here..." />
                    <button className="todolist__new-todo-add" onClick={this.addNewTask}>add</button>
                </div>
                <div className="todolist__container">
                    {this.props.list.length > 0
                        ? this.props.list.map( (item) => <TodoListItem key={item.id} {...item}/> )
                        : (<div className="todolist__empty-list-alert">Your to-do list is empty</div>)
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        list : state.todolist.list
    }),

    dispatch => ({
        onAddNewTask : (text) =>
        {
            dispatch({type: Actions.ADD_NEW_TASK, text})
        }
    })
)(TodoList);
