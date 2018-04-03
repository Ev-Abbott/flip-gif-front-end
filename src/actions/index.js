import {
    BRUSH_COLOR_SET
} from '../actions/actionTypes';

export function setBrushColor(brushColor) {
    return (dispatch) => {
        dispatch({
            type: BRUSH_COLOR_SET,
            brushColor
        });
    }
}