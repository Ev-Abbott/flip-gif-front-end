import {
    BRUSH_COLOR_SET, 
    BRUSH_SIZE_SET,
    ERASER_COLOR_SET,
    SELECTED_TOOL_SET,
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
} from '../actions/actionTypes';

export function setFlipbook(flipbook) {
    return (dispatch) => {
        dispatch({
            type: FLIPBOOK_SET,
            flipbook
        })
    }
}

export function updateCurrFrame(direction) {
    return (dispatch) => {
        dispatch({
            type: CANVAS_UPDATE_CURR_FRAME,
            direction
        })
    }
}

export function canvasUpdateMax(int) {
    return (dispatch) => {
        dispatch({
            type: CANVAS_UPDATE_MAX_COUNT,
            int
        })
    }
}

export function canvasAddFrame(canvasData) {
    return (dispatch) => {
        dispatch({
            type: CANVAS_ADD_FRAME,
            canvasData
        })
    }
}

export function canvasInitialize(canvasData) {
    return (dispatch) => {
        dispatch({
            type: CANVAS_INITIALIZE,
            canvasData
        })
    }
}

export function canvasSave(imgURL) {
    return (dispatch) => {
        dispatch({
            type: CANVAS_SAVE,
            imgURL
        })
    }
}

export function canvasUndo() {
    return (dispatch) => {
        dispatch({
            type: CANVAS_UNDO
        })
    }
}

export function canvasRedo() {
    return (dispatch) => {
        dispatch({
            type: CANVAS_REDO
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

