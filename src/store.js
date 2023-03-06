import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk  from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { todos } from './todos/reducers';

/**
 * flow:
 *  components talks to action creators(action.js)
 *  reducers.js listens to actions.js and update state
 *  components listen to state variables and update component
 *  
 */

/**
 * redux used here has persistent and thunk operations
 * persistent - used for storing redux data in local storage so that data wont be lost when page refreshed
 * applyMiddleWare - used for asynchronous operations like API calls to update redux data 
 */
const reducers = {
    todos,
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}
const rootReducer = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
    );