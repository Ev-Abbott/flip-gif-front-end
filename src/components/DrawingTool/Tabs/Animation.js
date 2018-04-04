import React from 'react';

const AnimationTab = () => {
    return (
        <div className='flex-container flex-row justify-content-space-around align-items-center'>
            <div className='flex-container flex-column'>
                <div className='flex-container flex-row justify-content-space-between align-content-center'>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                        <i className="far fa-lightbulb fa-lg"></i>
                    </div>
                    <div className='flex-container flex-row'>
                        <p>Frames: &nbsp;</p>
                        <input className="DrawingTool-numberInput" type="number" />
                    </div>
                </div>
                <div className='flex-container flex-row justify-content-space-between align-content-center'>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                        <i className="fas fa-play fa-lg"></i>
                    </div>
                    <div className='flex-container flex-row'>
                        <p>FPS: &nbsp;</p>
                        <input className="DrawingTool-numberInput" type="number" />
                    </div>
                </div>
            </div>
            <div className='flex-container flex-column'>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-plus-circle fa-lg"></i>
                </div>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="far fa-trash-alt fa-lg"></i>
                </div>
            </div>
            <div className='flex-container flex-column'>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-angle-left fa-lg"></i>
                </div>
            </div>
            <div className='flex-container flex-column'>
                {/* <p>Frame 1 / 100</p> */}
                <img src="http://via.placeholder.com/80x80" />
            </div>
            <div className='flex-container flex-column'>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-angle-right fa-lg"></i>
                </div>
            </div>
            <div className='flex-container flex-column'>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="far fa-copy fa-lg"></i>
                </div>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-paste fa-lg"></i>
                </div>
            </div>
        </div>
    );
}

export default AnimationTab;