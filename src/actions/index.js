import {
    BRUSH_COLOR_SET, 
    BRUSH_SIZE_SET,
    ERASER_COLOR_SET,
    SELECTED_TOOL_SET,
    BRUSH_POS_SET,
    CAN_PAINT_TOGGLE,
    SCALE_FACTOR_SET,
    CURR_CANVAS_SAVE_IMG_DATA
} from '../actions/actionTypes';

export function saveCurrCanvas(imgURL) {
    return (dispatch) => {
        dispatch({
            type: CURR_CANVAS_SAVE_IMG_DATA,
            imgURL
        })
    }
}

export function setScaleFactor(scaleFactor) {
    return (dispatch) => {
        dispatch({
            type: SCALE_FACTOR_SET,
            scaleFactor
        })
    }
}

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

