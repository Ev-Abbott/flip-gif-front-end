import { combineReducers } from 'redux';
import {
    BRUSH_COLOR_SET, 
    ERASER_COLOR_SET,
    SELECTED_TOOL_SET,
    BRUSH_SIZE_SET,
    BRUSH_POS_SET,
    CAN_PAINT_TOGGLE
} from '../actions/actionTypes';

function canPaint(state = false, action) {
    switch(action.type) {
        case CAN_PAINT_TOGGLE: {
            return action.canPaintStatus;
        }
        default: {
            return state;
        }
    }
}

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

function brushSize(state = 1, action) {
    switch(action.type) {
        case BRUSH_SIZE_SET: {
            return action.brushSize;
        }
        default: {
            return state;
        }
    }
}

function brushPos(state = null, action) {
    switch(action.type) {
        case BRUSH_POS_SET: {
            return action.brushPos;
        }
        default: {
            return state;
        }
    }
}


function eraserColor(state = { r: 255, g: 255, b: 255}, action) {
    switch(action.type) {
        case ERASER_COLOR_SET: {
            return action.eraserColor;
        }
        default: {
            return state;
        }
    }
}

function selectedTool(state = null, action) {
    switch(action.type) {
        case SELECTED_TOOL_SET: {
            if (state === action.toolName) return null;
            return action.toolName;
        }
        default: {
            return state;
        }
    }
} 

export default combineReducers({
    brushColor,
    brushSize,
    brushPos,
    eraserColor,
    selectedTool,
    canPaint
});