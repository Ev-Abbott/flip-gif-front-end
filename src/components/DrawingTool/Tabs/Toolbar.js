import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBrushSize } from '../../../actions';
import { Input, Label, Segment } from 'semantic-ui-react';
import BrushColorPicker from '../ColorPickers/BrushColorPicker';
import EraserColorPicker from '../ColorPickers/EraserColorPicker';
import ToolSelector from '../ToolSelector/ToolSelector';

const Toolbar = ({ brushSize, setBrushSize }) => {
    const changeBrushSize = (e, setBrushSize) => {
        let sizeInput = parseInt(e.target.value);
        if (Number.isInteger(sizeInput)) {
            if (sizeInput > 0 && sizeInput < 100) {
                setBrushSize(sizeInput)
            }
        } else {
            setBrushSize('');
        }
    }
    return (
        <div className='flex-container flex-row justify-content-space-around'>
            <div className='flex-container flex-column align-items-center'>
                <Segment style={{ height: '180px' }}>
                    <Label attached='top'>
                        <i className="fas fa-paint-brush"></i> &amp; <i className="fas fa-eraser"></i>
                    </Label>
                    <div className='flex-container flex-column'>
                        <div>
                            <BrushColorPicker /> 
                            <EraserColorPicker />
                        </div>
                        <div>
                            <Input error={brushSize === ''} placeholder={1} type='number'>
                                <input
                                    value={brushSize}
                                    onFocus={(e) => console.log('Im focused')}
                                    onChange={(e) => changeBrushSize(e, setBrushSize)}
                                    style={{width: "50px"}} />
                            </Input>
                        </div>
                    </div>
                </Segment>
            </div>
            <div className='flex-container flex-column'>
                <Segment style={{ height: '180px' }}>
                    <Label attached='top'>Tools</Label>
                    <ToolSelector />
                </Segment>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    brushSize: state.brushSize
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setBrushSize
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);


