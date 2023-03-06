import React from "react";
import { connect } from 'react-redux';
import { addTodoRequest } from "./thunks";
import './NewTodoForm.css';

const NewTodoForm = ({ todos, onCreatePressed }) => {
    const [inputValue, setInputValue] = React.useState('');
    return (
        <div className="new-todo-form">
            <input 
                type="text" 
                className="new-todo-input" 
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Type your new Todo item"    
            />
            <button 
                className="new-todo-button button"
                onClick={
                    () => {
                        const isDuplicateText = todos.includes(inputValue);
                        if(!isDuplicateText){
                            onCreatePressed(inputValue);
                            setInputValue('');
                        }
                    }
                }            
            >Create Todo</button>
        </div>
    )
}

const mapStateToProps = state => ({
    todos: state.todos,
});
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
});

export const NewTodoFormTest = NewTodoForm;

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);