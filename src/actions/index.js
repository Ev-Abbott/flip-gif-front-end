import {
    BRUSH_COLOR_SET, 
    BRUSH_SIZE_SET,
    ERASER_COLOR_SET,
    SELECTED_TOOL_SET,
    BRUSH_POS_SET,
    CAN_PAINT_TOGGLE
} from '../actions/actionTypes';

export function toggleCanPaint(canPaintStatus) {
    return (dispatch) => {
        dispatch({
            type: CAN_PAINT_TOGGLE,
            canPaintStatus
        })
    }
}
export function setBrushColor(brushColor) {
    return (dispatch) => {
        dispatch({
            type: BRUSH_COLOR_SET,
            brushColor
        });
    }
}

export function setBrushSize(brushSize) {
    return (dispatch) => {
        dispatch({
            type: BRUSH_SIZE_SET,
            brushSize
        })
    }
}

export function setBrushPos(brushPos) {
    return (dispatch) => {
        dispatch({
            type: BRUSH_POS_SET,
            brushPos
        })
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

