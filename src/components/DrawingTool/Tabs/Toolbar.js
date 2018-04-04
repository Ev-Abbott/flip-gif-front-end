import React from 'react';
import { Input, Label, Segment } from 'semantic-ui-react';
import BrushColorPicker from '../ColorPickers/BrushColorPicker';
import EraserColorPicker from '../ColorPickers/EraserColorPicker';
import ToolSelector from '../ToolSelector/ToolSelector';

const Toolbar = () => {
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
                    <Input style={{width: "60px"}} type='number' />
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

export default Toolbar;
