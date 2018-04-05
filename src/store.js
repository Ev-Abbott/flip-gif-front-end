import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';
import { CANVAS_SAVE, CANVAS_UNDO } from './actions/actionTypes';

const logger = createLogger({
    predicate: (getState, action) => (
        action.type === CANVAS_SAVE || action.type === CANVAS_UNDO
    )
});

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware, logger)
    )
);

export default store;