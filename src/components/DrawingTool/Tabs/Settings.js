import React from 'react';

const SettingsTab = () => {
    return (
        <div className='flex-container flex-row justify-content-space-around align-items-center'>
            <div className='flex-container flex-column'>
                <div className='flex-container flex-row justify-content-space-between align-content-center'>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                        <i class="fas fa-save fa-lg"></i>
                    </div>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    </div>
                </div>
                <div className='flex-container flex-row justify-content-space-between align-content-center'>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                        <i class="fas fa-cloud-upload-alt fa-lg"></i>
                    </div>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    </div>
                </div>
            </div>
            <div className='flex-container flex-column'>
                <div className='flex-container flex-row justify-content-space-between align-content-center'>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                        <i class="fas fa-download fa-lg"></i>
                    </div>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    </div>
                </div>
                <div className='flex-container flex-row justify-content-space-between align-content-center'>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                        <i class="fas fa-sign-out-alt fa-lg"></i>
                    </div>
                    <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsTab;

{/* <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'></div>  */}