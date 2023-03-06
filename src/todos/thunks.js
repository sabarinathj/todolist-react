import axios from 'axios';
import { 
    loadTodosInProgress, 
    loadTodosSuccess, 
    loadTodosFailure, 
    createToDo,
    removeToDo,
    markTodoAsCompleted,
} from "./actions"

export const displayAlert = text => () => {
    alert(`${text}`);
}

/**
 * flow:
 * Thunks is used to get data of asynchronous operatoins and dispatch actions of received information
 * it is a function which returns a function which has asynchronous operations
 * 
 */

export const loadTodos = () => async (dispatch, getState) => {
    try{
        dispatch(loadTodosInProgress());
        const todos = await axios('http://localhost:8080/todos-delay').catch(err => err);
        // const todos = result.json();
        console.log("todos: ", todos);
        dispatch(loadTodosSuccess(todos.data));
    } catch(e) {
        dispatch(loadTodosFailure(e));
    }

}

export const addTodoRequest = text => async dispatch => {
    try{
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'content-type': 'application/json',
            },
            method: 'post',
            body,
        });
        const todo = await response.json();
        dispatch(createToDo(todo));
    } catch(e) {
        dispatch(displayAlert(e));
    }
}

export const removeToDoRequest = id => async dispatch => {
    try{
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete',
        });
        const removedToDo = await response.json();
        console.log("removedToDo", removedToDo);
        dispatch(removeToDo(removedToDo));

    }catch(e){
        dispatch(displayAlert(e));
    }
}

export const markTodoAsCompletedRequest = id => async dispatch => {
    try{
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'post',
        });
        const completedTodo = await response.json();
        console.log('completedTodo', completedTodo);
        dispatch(markTodoAsCompleted(completedTodo));
    }catch(e){
        dispatch(displayAlert(e));
    }
}