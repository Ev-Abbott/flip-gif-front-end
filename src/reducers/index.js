import { combineReducers } from 'redux';
import {
    BRUSH_COLOR_SET,
    ERASER_COLOR_SET,
    SELECTED_TOOL_SET,
    BRUSH_SIZE_SET,
    BRUSH_POS_SET,
    CAN_PAINT_TOGGLE,
    SCALE_FACTOR_SET,
    CANVAS_SAVE,
    CANVAS_UNDO,
    CANVAS_REDO,
    CANVAS_INITIALIZE,
    FLIPBOOK_SET,
    CANVAS_ADD_FRAME,
    CANVAS_UPDATE_MAX_COUNT,
    CANVAS_UPDATE_CURR_FRAME,
    CANVAS_REMOVE_FRAME,
    LIGHTBOX_TOGGLE_ACTIVE,
    LIGHTBOX_SET_FRAME_COUNT,
    ANIMATION_SET_ACTIVE,
    ANIMATION_SET_INACTIVE,
    DIMMER_TOGGLE_DIMMER
} from '../actions/actionTypes';

function dimmer(state = false, action) {
    switch(action.type) {
        case DIMMER_TOGGLE_DIMMER: {
            return !state;
        }
        default: {
            return state;
        }
    }
}

function animation(state = { isActive: false, imgURL: '' }, action) {
    switch(action.type) {
        case ANIMATION_SET_ACTIVE: {
            return {
                isActive: true,
                imgURL: action.imgURL
            }
        }
        case ANIMATION_SET_INACTIVE: {
            return {
                isActive: false,
                imgURL: ''
            }
        }
        default: {
            return state;
        }
    }
}

function lightBox(state = { isActive: false, frames: 0 }, action) {
    switch(action.type) {
        case LIGHTBOX_TOGGLE_ACTIVE: {
            return {
                isActive: !state.isActive,
                frames: state.frames
            }
        }
        case LIGHTBOX_SET_FRAME_COUNT: {
            return {
                isActive: state.isActive,
                frames: action.frames
            }
        }
        default: {
            return state;
        }
    }
}

function flipbook(state = '', action) {
    switch(action.type) {
        case FLIPBOOK_SET: {
            return action.flipbook;
        }
        default: {
            return state;
        }
    }
}

function canvasSave(state = {frame: 1, frameMax: 1, index: -1, imageHistory: []}, action) {
    switch(action.type) {
        case CANVAS_UPDATE_MAX_COUNT: {
            return {
                frame: state.frame,
                frameMax: action.int,
                index: state.index,
                imageHistory: state.imageHistory
            }
        }
        case CANVAS_UPDATE_CURR_FRAME: {
            if (action.direction === 'DECREASE') {
                return {
                    frame: state.frame-1,
                    frameMax: state.frameMax,
                    index: 0,
                    imageHistory: [ action.dataToSend ]
                }
            } else if (action.direction === 'INCREASE') {
                return {
                    frame: state.frame+1,
                    frameMax: state.frameMax,
                    index: 0,
                    imageHistory: [ action.dataToSend ]
                }
            }
            return state;
        }
        case CANVAS_SAVE: {
            if (state.imageHistory.length < 100) {
                return {
                    frame: state.frame,
                    frameMax: state.frameMax,
                    index: state.index + 1,
                    imageHistory: [...state.imageHistory.slice(0, state.index+1), action.imgURL]
                }
            } else {
                return {
                    frame: state.frame,
                    frameMax: state.frameMax,
                    index: 99,
                    imageHistory: [...state.imageHistory.slice(1, state.index), action.imgURL]
                }
            }
            
        }
        case CANVAS_ADD_FRAME: {
            return {
                frame: state.frame + 1,
                frameMax: state.frameMax + 1,
                index: 0,
                imageHistory: [ action.canvasData ]
            }
        }
        case CANVAS_REMOVE_FRAME: {
            // Resolve Frame 1 issues later
            // if (state.frame === 1) {
            //     return {
            //         frame: 1,
            //         frameMax: state.frameMax -1,
            //         index: -1,
            //         imageHistory: [ ]
            //     }
            // }
            return {
                frame: state.frame,
                frameMax: state.frameMax -1,
                index: 0,
                imageHistory: [ action.canvasData ]
            }
        }
        case CANVAS_INITIALIZE: {
            return {
                frame: 1,
                frameMax: state.frameMax,
                index: 0,
                imageHistory: [ action.canvasData ]
            }
        }
        case CANVAS_UNDO: {
            if ((state.index - 1 ) < 0) {
                return state;
            }
            return {
                frame: state.frame,
                frameMax: state.frameMax,
                index: state.index - 1,
                imageHistory: state.imageHistory
            }
        }
        case CANVAS_REDO: {
            if (state.index === state.imageHistory.length) {
                return state;
            }
            return {
                frame: state.frame,
                frameMax: state.frameMax,
                index: state.index + 1,
                imageHistory: state.imageHistory
            }
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

function brushSize(state = 4, action) {
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

function selectedTool(state = 'BRUSH', action) {
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
    canvasSave,
    flipbook,
    lightBox,
    animation,
    dimmer
});