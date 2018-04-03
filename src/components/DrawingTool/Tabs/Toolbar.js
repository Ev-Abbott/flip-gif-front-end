import React, { Component } from 'react';
import BrushColorPicker from '../ColorPickers/BrushColorPicker';
import EraserColorPicker from '../ColorPickers/EraserColorPicker';
import ToolSelector from '../ToolSelector/ToolSelector';

const Toolbar = () => {
    return (
        <div className='flex-container flex-row justify-content-space-around'>
            <div className='flex-container flex-column'>
                <div className='flex-container flex-row justify-content-space-between align-content-center'>
                    <p>Brush: &nbsp;</p>
                    <BrushColorPicker /> 
                </div>
                <div className='flex-container flex-row justify-content-space-between align-content-center'>
                    <p>Eraser: &nbsp;</p>
                    <EraserColorPicker /> 
                </div>
            </div>
            <div className='flex-container flex-column'>
                <ToolSelector />
            </div>
            <div className='flex-container flex-column'>
                {/* <div className='flex-container flex-row justify-content-space-evenly'>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                        <i className="fas fa-circle fa-lg"></i>
                    </div>
                    <input className="DrawingTool-numberInput" type="number" />
                    <p>&nbsp; Size</p>
                </div>
                <div className='flex-container flex-row justify-content-space-evenly'>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                        <i className="far fa-lightbulb fa-lg"></i>
                    </div>
                    <input className="DrawingTool-numberInput" type="number" />
                    <p>&nbsp; Frames</p>
                </div> */}
            </div>
        </div>
    );
}

export default Toolbar;
