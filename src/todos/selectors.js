import { createSelector } from 'reselect';
import { todos } from './reducers';

/**
 * 
 * @param {*} state 
 * @returns state 
 * Agenda:
 *  Purpose of selectors is to sync all mapstatetoprops when a reducer info is changed
 */

export const getTodos = state => state.todos.data;
export const getTodosLoading = state => state.todos.isLoading;

/**
 * createSelector is just for memoization of data for performance improvement of loading every time app re render
 */
export const getCompletedTodos = createSelector(
    getTodos,
    todos => todos.filter(todo => todo.isCompleted),
);

export const getIncompletedTodos = createSelector(
    getTodos,
    todos => todos.filter(todo => !todo.isCompleted),
);