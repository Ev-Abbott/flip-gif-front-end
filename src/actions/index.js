import {
    BRUSH_COLOR_SET, 
    ERASER_COLOR_SET,
    SELECTED_TOOL_SET
} from '../actions/actionTypes';

export function setBrushColor(brushColor) {
    return (dispatch) => {
        dispatch({
            type: BRUSH_COLOR_SET,
            brushColor
        });
    }
}

export function setEraserColor(eraserColor) {
    return (dispatch) => {
        dispatch({
            type: ERASER_COLOR_SET,
            eraserColor
        });
    }
}

export function setSelectedTool(toolName) {
    return (dispatch) => {
        dispatch({
            type: SELECTED_TOOL_SET,
            toolName
        })
    }
}

