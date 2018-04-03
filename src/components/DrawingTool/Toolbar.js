import React, { Component } from 'react';
import paintBucket from './paint-bucket.svg';
import TinyColorPicker from './TinyColorPicker';

const Toolbar = () => {
    const setBrushColor = () => {
        console.log('This is the brush');
    }
    return (
        <div className='flex-container flex-row justify-content-space-around'>
            <div className='flex-container flex-column'>
                <div className='flex-container flex-row justify-content-space-between align-content-center'>
                    <p>Brush: &nbsp;</p>
                    <TinyColorPicker startingColor={{r: 0, g: 0, b: 0}}/> 
                </div>
                <div className='flex-container flex-row justify-content-space-between align-content-center'>
                    <p>Eraser: &nbsp;</p>
                    <TinyColorPicker startingColor={{r: 255, g: 255, b: 255}}/> 
                </div>
            </div>
            <div className='flex-container flex-column'>
                <div className='flex-container flex-row justify-content-space-between'>
                    <div className='DrawingTool-iconContainer DrawingTool-isSelected flex-container justify-content-center align-items-center'>
                        <i className="fas fa-paint-brush fa-lg"></i>
                    </div>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                        <img src={paintBucket} width='19' height='16'/>
                    </div>
                </div>
                <div className='flex-container flex-row justify-content-space-between'>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                        <i className="fas fa-eraser fa-lg"></i>
                    </div>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                        <i className="fas fa-bomb fa-lg"></i>
                    </div>
                </div>
            </div>
            <div className='flex-container flex-column'>
                <div className='flex-container flex-row justify-content-space-evenly'>
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
                </div>
            </div>
        </div>
    );
}

export default Toolbar;

/* <div className='flex-container flex-row justify-content-space-around'>
<div className='flex-container flex-row'>
    <div className='flex-container flex-column justify-content-space-evenly'>
        <p>Brush: &nbsp;</p>
        <p>Eraser: &nbsp;</p>
    </div>
    <div className='flex-container flex-column justify-content-space-evenly'>
        <TinyColorPicker onChange={(e) => setBrushColor(e)} startingColor={{r: 0, g: 0, b: 0}}/> 
        <TinyColorPicker startingColor={{r: 255, g: 255, b: 255}}/>
    </div>
</div>
<div className='flex-container flex-row'>
    <div className='flex-container flex-column justify-content-space-evenly'>
        <i className="fas fa-paint-brush fa-2x DrawingTool-iconContainer DrawingTool-isSelected"></i>
        <img src={paintBucket} className="DrawingTool-iconContainer" width='28' height='28'/>
    </div>
    
    <div className='flex-container flex-column justify-content-space-evenly'>
        <i className="fas fa-eraser fa-2x DrawingTool-iconContainer"></i>
        <i className="fas fa-bomb fa-2x DrawingTool-iconContainer"></i>
    </div>
    
</div>
<div className='flex-container flex-row'>
    <div className='flex-container flex-column justify-content-space-evenly DrawingTool-toolContainer'>
        <i className="fas fa-circle fa-2x DrawingTool-iconContainer"></i>
        <i className="far fa-lightbulb fa-2x DrawingTool-iconContainer"></i>
    </div>
    <div className='flex-container flex-column justify-content-space-evenly'>
        <input className="DrawingTool-numberInput" type="number" />
        <input className="DrawingTool-numberInput" type="number" />
    </div>
    <div className='flex-container flex-column justify-content-space-evenly'>
        <p>&nbsp; Size</p>
        <p>&nbsp; Frames</p>
    </div>
    {/* <i className="fas fa-undo fa-2x"></i>
    <i className="fas fa-redo fa-2x"></i> */
// </div>
// </div> 