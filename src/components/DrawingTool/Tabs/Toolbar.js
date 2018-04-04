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
            if (sizeInput > 0 && sizeInput < 101) {
                setBrushSize(sizeInput)
            }
        } else {
            setBrushSize('');
        }
    }
    return (
        <div className='flex-container flex-row justify-content-space-around'>
            <div className='flex-container flex-column align-items-center'>
                <Segment>
                    <Label attached='top'>Color</Label>
                    <BrushColorPicker /> 
                    <EraserColorPicker />
                </Segment>
            </div>
            <div className='flex-container flex-column align-items-center'>
                <Segment>
                    <Label attached='top'>Size</Label>
                    <Input error={brushSize === ''} placeholder={1} type='number'>
                        <input
                            value={brushSize}
                            onFocus={(e) => console.log('Im focused')}
                            onChange={(e) => changeBrushSize(e, setBrushSize)}
                            style={{width: "60px"}} />
                    </Input>
                </Segment>
            </div>
            <div className='flex-container flex-column'>
                <Segment>
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


