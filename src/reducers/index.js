import { combineReducers } from 'redux';
import {
    BRUSH_COLOR_SET
} from '../actions/actionTypes';

function brushColor(state = { r: 0, g: 0, b: 0}, action) {
    switch(action.type) {
        case BRUSH_COLOR_SET: {
            return action.brushColor;
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    brushColor
});