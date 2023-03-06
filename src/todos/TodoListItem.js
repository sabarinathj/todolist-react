import React from "react";

import './TodoListItem.css'
const TodoListItem = ({ todo, onRemovePressed, onMarkCompletedPressed, onThunkTestPressed }) => (
    <div className="todo-item-container">
        <h3 className="todo-text">{todo.text}</h3>
        <div className="buttons-container">
            <button 
                className="completed-button button"
                onClick={() => {
                    onMarkCompletedPressed(todo.id)
                }}
                disabled = {todo.isCompleted}
            >{todo.isCompleted ? 'Completed': 'Mark as completed'}</button>
            <button 
                className="remove-button button"
                onClick={() => {
                    onRemovePressed(todo.id)
                }}
            >Remove</button>
            {/* <button 
                className="remove-button button"
                onClick={() => {
                    onThunkTestPressed(todo.text)
                }}
            >Test Thunk</button> */}
        </div>
    </div>
)

export default TodoListItem;