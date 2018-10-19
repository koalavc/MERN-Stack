import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const initalState = {};

const middleware = [thunk];
/*
    createStore takes in three arguments.
    1. Reducer
    2. State
    3. Store enhancer
*/ 
const store = createStore(
    rootReducer, 
    initalState, 
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;