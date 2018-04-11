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
    CANVAS_REMOVE_FRAME,
    LIGHTBOX_TOGGLE_ACTIVE,
    LIGHTBOX_SET_FRAME_COUNT,
    ANIMATION_SET_ACTIVE,
    ANIMATION_SET_INACTIVE,
    DIMMER_TOGGLE_DIMMER,
} from '../actions/actionTypes';
import axios from 'axios';
const BaseUrl = 'http://localhost:8080';

export function toggleDimmer() {
    return (dispatch) => {
        dispatch({
            type: DIMMER_TOGGLE_DIMMER
        })
    }
}

export function setAnimationActive(imgURL) {
    return (dispatch) => {
        dispatch({
            type: ANIMATION_SET_ACTIVE,
            imgURL
        })
    }
}

export function setAnimationInactive() {
    return (dispatch) => {
        dispatch({
            type: ANIMATION_SET_INACTIVE
        })
    }
}

export function toggleLightbox() {
    return (dispatch) => {
        dispatch({
            type: LIGHTBOX_TOGGLE_ACTIVE
        })
    }
}

export function setLightboxFrames(frames) {
    return (dispatch) => {
        dispatch({
            type: LIGHTBOX_SET_FRAME_COUNT,
            frames
        })
    }
}

export function setFlipbook(flipbook) {
    return (dispatch) => {
        dispatch({
            type: FLIPBOOK_SET,
            flipbook
        })
    }
}

export function updateCurrFrame(direction) {
    return async (dispatch, getState) => {
        const { canvasSave, flipbook } = getState();
        let modifier = 0;
        if (direction === 'INCREASE') modifier = 1;
        if (direction === 'DECREASE') modifier = -1;
        let canvasData = await axios.get(`${BaseUrl}/flipbooks/${flipbook.name}/frames/${canvasSave.frame+modifier}`);
        let dataToSend = canvasData.data.data.imgURL;
        dispatch({
            type: CANVAS_UPDATE_CURR_FRAME,
            direction,
            dataToSend
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

export function canvasRemoveFrame(name, frame) {
    return async (dispatch, getState) => {
        // to-do resolve frame 1 decrement
        
        let imgResult = await axios.get(`${BaseUrl}/flipbooks/${name}/frames/${frame}`);
        let canvasData = imgResult.data.data.imgURL;
        dispatch({
            type: CANVAS_REMOVE_FRAME,
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

