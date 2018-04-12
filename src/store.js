import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
// import { createLogger } from 'redux-logger';
// import { CANVAS_SAVE, CANVAS_UNDO, CANVAS_REDO } from './actions/actionTypes';

// const logger = createLogger({
//     predicate: (getState, action) => (
//         action.type
//         // action.type === CANVAS_SAVE || action.type === CANVAS_UNDO || action.type === CANVAS_REDO
//     )
// });

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

export default store;