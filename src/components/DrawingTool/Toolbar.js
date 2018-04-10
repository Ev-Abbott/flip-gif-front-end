import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {notify} from 'react-notify-toast';
import { setBrushSize, canvasUndo, canvasRedo } from '../../actions';
import { Input, Label, Segment } from 'semantic-ui-react';
import BrushColorPicker from './ColorPickers/BrushColorPicker';
import ToolSelector from './ToolSelector/ToolSelector';
import BrushSelector from './ToolSelector/BrushSelector';

const Toolbar = ({ brushSize, setBrushSize, canvasUndo, canvasRedo }) => {
    const changeBrushSize = (e, setBrushSize) => {
        let sizeInput = parseInt(e.target.value, 10);
        if (Number.isInteger(sizeInput)) {
            if (sizeInput > 0 && sizeInput < 100) {
                setBrushSize(sizeInput)
            }
        } else {
            setBrushSize('');
        }
    }

    const startUndo = (notify, canvasUndo) => {
        canvasUndo();
        notify.show('Action Undone', 'success', 800);
        
    }

    const startRedo = (notify, canvasRedo) => {
        canvasRedo();
        notify.show('Action Redone', 'success', 800);
    }

    return (
        
        <div className='flex-container flex-column align-items-center'>
            <Segment style={{width: '100%'}}>
                <Label attached='top'>
                    <span className='header-styled-text'>Brush Settings</span>
                </Label>
                <div className='flex-container flex-row justify-content-space-around align-items-center flex-wrap'>
                    <div className='flex-container flex-row justify-content-space-between align-items-center'>
                        <div style={{ margin: '5px'}}>
                            <BrushColorPicker /> 
                        </div>
                        <div style={{ margin: '5px'}}>
                            <Input error={brushSize === ''} placeholder={1} type='number'>
                                <input
                                    value={brushSize}
                                    onChange={(e) => changeBrushSize(e, setBrushSize)}
                                    style={{width: "50px"}} />
                            </Input>
                        </div>
                        <div onTouchStart={() => startUndo(notify, canvasUndo)}
                            className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <i className="fas fa-undo fa-2x"></i>
                        </div>
                        <div 
                            onTouchStart={() => startRedo(notify, canvasRedo)}
                            className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <i className="fas fa-redo fa-2x"></i>
                        </div>
                    </div>
                    
                    <BrushSelector />
                </div>
                
            </Segment>
        
            <Segment style={{width: '100%'}}>
                <Label attached='top'>
                    <span className='header-styled-text'>Animation Settings</span>
                </Label>
                <ToolSelector /> 
            </Segment>
        </div>
        
    );
}

const mapStateToProps = (state) => ({
    brushSize: state.brushSize
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setBrushSize,
    canvasUndo,
    canvasRedo
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);


