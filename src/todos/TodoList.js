import React from "react";
import { connect } from 'react-redux';
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { loadTodos, removeToDoRequest, markTodoAsCompletedRequest } from './thunks';

import './TodoList.css';

const TodoList = ({ 
    todos = [], 
    onRemovePressed, 
    onMarkCompletedPressed, 
    onThunkTestPressed, 
    startLoadingTodos, 
    isLoading 
    }) => {
    
    React.useEffect(() => {
        startLoadingTodos();
    }, []);
    console.log("isLoading: ", isLoading);
    const loadingMessage = <div>loading todos....</div>
    const content = (
        <div className="list-wrapper">
        {console.log("todos is: ", todos)}
            <NewTodoForm />
            {todos.map((todo, index) => 
                <TodoListItem 
                    key={index}
                    todo={todo} 
                    onRemovePressed={onRemovePressed}
                    onMarkCompletedPressed={onMarkCompletedPressed}
                    onThunkTestPressed={onThunkTestPressed}
                />
            )} 
        </div>
    )
    return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    todos: state.todos,
})

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeToDoRequest(id)),
    onMarkCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
    // onThunkTestPressed: text => dispatch(displayAlert(text)),
})

/*
    while writing test cases., it is not necessary to setup connected store. So., new const export added
    it is not mandatory to add both. Just to simplify unit test cases., 2 exports are added. 
    we can remove const if not required
 */
export const TodoListTest = TodoList;

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);