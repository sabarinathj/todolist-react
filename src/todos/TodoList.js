import React from "react";
import { connect } from 'react-redux';
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { getTodosLoading, getCompletedTodos, getIncompletedTodos } from './selectors';
import { loadTodos, removeToDoRequest, markTodoAsCompletedRequest } from './thunks';

import './TodoList.css';

const TodoList = ({ 
    completedTodos,
    incompletedTodos, 
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
            <NewTodoForm />
            <hr/><h3>Incompleted: </h3><hr/>
            {incompletedTodos.map((todo, index) => 
                <TodoListItem 
                    key={index}
                    todo={todo} 
                    onRemovePressed={onRemovePressed}
                    onMarkCompletedPressed={onMarkCompletedPressed}
                    onThunkTestPressed={onThunkTestPressed}
                />
            )}
            <hr/><h3>Completed: </h3><hr/>
            {completedTodos.map((todo, index) => 
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
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompletedTodos(state),
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