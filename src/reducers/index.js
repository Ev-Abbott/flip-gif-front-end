import { combineReducers } from 'redux';
import {
    BRUSH_COLOR_SET,
    ERASER_COLOR_SET,
    SELECTED_TOOL_SET,
    BRUSH_SIZE_SET,
    BRUSH_POS_SET,
    CAN_PAINT_TOGGLE,
    SCALE_FACTOR_SET,
    CURR_CANVAS_SAVE_IMG_DATA,
    CANVAS_SAVE,
    CANVAS_UNDO
} from '../actions/actionTypes';

function canvasSave(state = {index: -1, imageHistory: []}, action) {
    switch(action.type) {
        case CANVAS_SAVE: {
            return {
                index: state.index + 1,
                imageHistory: [...state.imageHistory.slice(0, state.index+1), action.imgURL]
            }
        }
        case CANVAS_UNDO: {
            return {
                index: state.index - 1,
                imageHistory: state.imageHistory
            }
        }
        default: {
            return state;
        }
    }
}

function canvasDataHistory(state = [], action) {
    switch (action.type) {
        case CURR_CANVAS_SAVE_IMG_DATA: {
            let newState = [...state];
            if (newState.length > 100) {
                newState.shift();
            }
            newState.push(action.imgURL);
            return newState;
        }
        default: {
            return state;
        }
    }
}

function scaleFactor(state = 0, action) {
    switch (action.type) {
        case SCALE_FACTOR_SET: {
            return action.scaleFactor;
        }
        default: {
            return state;
        }
    }
}

function canPaint(state = false, action) {
    switch (action.type) {
        case CAN_PAINT_TOGGLE: {
            return action.canPaintStatus;
        }
        default: {
            return state;
        }
    }
}

function brushColor(state = { r: 0, g: 0, b: 0 }, action) {
    switch (action.type) {
        case BRUSH_COLOR_SET: {
            return action.brushColor;
        }
        default: {
            return state;
        }
    }
}

function brushSize(state = 1, action) {
    switch (action.type) {
        case BRUSH_SIZE_SET: {
            return action.brushSize;
        }
        default: {
            return state;
        }
    }
}

function brushPos(state = null, action) {
    switch (action.type) {
        case BRUSH_POS_SET: {
            return action.brushPos;
        }
        default: {
            return state;
        }
    }
}


function eraserColor(state = { r: 255, g: 255, b: 255 }, action) {
    switch (action.type) {
        case ERASER_COLOR_SET: {
            return action.eraserColor;
        }
        default: {
            return state;
        }
    }
}

function selectedTool(state = null, action) {
    switch (action.type) {
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
    canPaint,
    scaleFactor,
    canvasDataHistory,
    canvasSave
});