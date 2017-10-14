import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from "../Actions";

class TodoListItem extends Component
{

    check = () =>
    {
        this.props.onItemCheckUpdate(this.props.id);
    };

    remove = () =>
    {
        setTimeout(() => {
            this.props.onItemRemove(this.props.id);
        }, 400);

        this.item.classList.add('hide-right');

    };

    componentDidMount()
    {
        setTimeout(() => {
            this.item.classList.remove('hide');
        }, 10);

    }

    componentWillUnmount()
    {
        this.item.classList.add('hide');
    }

    render() {
        return (
            <div className="todolist__item hide" ref={ (item) => { this.item = item } } id={this.props.id} data-done={this.props.done}>
                <span className="check" onClick={this.check}></span>
                <span className="todolist__item-text">{this.props.text}</span>
                <span className="remove" onClick={this.remove}><i className="fa fa-trash-o" aria-hidden="true"></i></span>
            </div>
        );
    }
}

export default connect(
    state => ({

    }),

    dispatch => ({
        onItemCheckUpdate : (itemID) => {
            dispatch({ type: Actions.UPDATE_ITEM_STATUS, itemID});
        },

        onItemRemove : (itemID) => {
            dispatch({ type: Actions.REMOVE_ITEM, itemID});
        }
    })

)(TodoListItem);
