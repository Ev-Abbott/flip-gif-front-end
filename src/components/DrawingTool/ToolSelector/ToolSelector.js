import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input } from 'semantic-ui-react';
import {notify} from 'react-notify-toast';
import { setSelectedTool, canvasAddFrame, canvasRemoveFrame, canvasUpdateMax, 
        updateCurrFrame, toggleLightbox, setLightboxFrames } from '../../../actions';
import paintBucket from './paint-bucket.svg';
import axios from 'axios';
const BaseUrl = 'http://localhost:8080';

let currMax = 0;

const ToolSelector = ({ selectedTool, setSelectedTool, canvasUndo, canvasRedo, flipbook, canvasSaveData, 
    canvasAddFrame, canvasRemoveFrame, canvasUpdateMax, updateCurrFrame, toggleLightbox, 
    setLightboxFrames, lightbox }) => {
    
    const saveToServer = (flipbook, canvasSaveData) => {
        let dataToSave = canvasSaveData.imageHistory[canvasSaveData.index];
        let frameToSave = { index: canvasSaveData.frame, imgURL: dataToSave, flipbook_id: flipbook.id };
        
        return axios.get(`${BaseUrl}/flipbooks/${flipbook.name}/frames/${canvasSaveData.frame}`)
            .then(res => {
                if (!res.data.data) {
                    return axios.post(`${BaseUrl}/flipbooks/${flipbook.name}/frames`, frameToSave);
                } else {
                    return axios.patch(`${BaseUrl}/flipbooks/${flipbook.name}/frames/${canvasSaveData.frame}`, frameToSave)
                }
            })
            .then(res => {
                console.log(res);
                notify.show('Frame Saved!', 'success', 800);
            })
            .catch(err => {
                console.log(err);
            }); 
    }

    const addNewFrame = (flipbook, canvasSaveData, canvasAddFrame) => {
        
        let dataToSave = canvasSaveData.imageHistory[canvasSaveData.index];
        let frameToSave = { index: canvasSaveData.frame, imgURL: dataToSave, flipbook_id: flipbook.id };
        return axios.patch(`${BaseUrl}/flipbooks/${flipbook.name}/frames/${canvasSaveData.frame}`, frameToSave)
            .then(res => {
                let newFrame = {...frameToSave, index: canvasSaveData.frame+1};
                return axios.post(`${BaseUrl}/flipbooks/${flipbook.name}/frames`, frameToSave);
            })
            .then(res => {
                // update frame in redux
                canvasAddFrame(res.data.data.imgURL);
                notify.show('Frame Added!', 'success', 800);
            })
    }

    const removeFrame = (flipbook, canvasSaveData, canvasRemoveFrame) => {
        if (canvasSaveData.frame === 1 && canvasSaveData.frame === canvasSaveData.frameMax) {
            notify.show('Cannot delete last frame.', 'error', 800);
        } else {    
            return axios.delete(`${BaseUrl}/flipbooks/${flipbook.name}/frames/${canvasSaveData.frame}`)
                .then(res => {
                    canvasRemoveFrame();
                    notify.show('Frame Deleted!', 'error', 800);
                })
        }
        
        
    }

    const toggleFramePrev = (flipbook, canvasSaveData, updateCurrFrame, direction) => {
        if (canvasSaveData.frame === 1) {
            notify.show('Cannot go to frame 0.', 'error', 800);
        } else {
            updateCurrFrame(direction);
        }
        
    }

    const toggleFrameNext = (flipbook, canvasSaveData, updateCurrFrame, direction) => {
        if (canvasSaveData.frame === canvasSaveData.frameMax) {
            notify.show('Cannot exceed maximum frame count.', 'error', 800);
        } else {
            updateCurrFrame(direction);
        }
        
    }

    const dispatchLightbox = (flipbook, canvasSaveData, toggleLightbox) => {
        toggleLightbox();
        notify.show('Lightbox is On', 'warning', 800);
    }

    const toggleAnimation = (flipbook, canvasSaveData) => {
        notify.show('Animation on!', 'success', 800);
    }

    const updateMaxFrameCount = (flipbook, canvasSaveData, canvasUpdateMax) => {
        return axios.get(`${BaseUrl}/flipbooks/${flipbook.name}?frameCnt=true`)
            .then(res => {
                let count = res.data.data.max;
                if (count === null) {
                    currMax = 1;
                } else {
                    currMax = count; 
                }
                canvasUpdateMax(currMax);
            });
    }
    
    if (flipbook.name && currMax !== canvasSaveData.frameMax) updateMaxFrameCount(flipbook, canvasSaveData, canvasUpdateMax);
    
    return (
        <div>
            <div className='flex-container flex-row justify-content-center'>
                <div onClick={() => toggleAnimation(flipbook, canvasSaveData)}
                    className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-play fa-2x"></i>
                </div>
                <div onClick={() => saveToServer(flipbook, canvasSaveData)}
                    className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i class="fas fa-save fa-2x"></i>
                </div>
                <div onClick={() => addNewFrame(flipbook, canvasSaveData, canvasAddFrame)} 
                    className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-plus-circle fa-2x"></i>
                </div>
                <div onClick={() => removeFrame(flipbook, canvasSaveData, canvasRemoveFrame)}  
                    className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-trash-alt fa-2x"></i>
                </div>
            </div>
            <div className='flex-container flex-row justify-content-center'>
                <div onClick={() => toggleLightbox(flipbook, canvasSaveData, toggleLightbox)}
                    className={(lightbox.isActive ? 'DrawingTool-lightboxSelected ' : '') 
                    + 'DrawingTool-iconContainer flex-container justify-content-center align-items-center'}>
                    <i className="far fa-lightbulb fa-2x"></i>
                </div>
                
                <Input placeholder={1} type='number'>
                    <input
                        style={{width: "50px"}} />
                </Input>
                <div onClick={() => toggleFramePrev(flipbook, canvasSaveData, updateCurrFrame, 'DECREASE')} 
                    className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-angle-left fa-2x"></i>
                </div>
                <div 
                    className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <p>Frame: {canvasSaveData.frame} / {canvasSaveData.frameMax}</p>
                </div>
                <div onClick={() => toggleFrameNext(flipbook, canvasSaveData, updateCurrFrame, 'INCREASE')}
                    className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-angle-right fa-2x"></i>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    selectedTool: state.selectedTool,
    flipbook: state.flipbook,
    canvasSaveData: state.canvasSave,
    lightbox: state.lightBox
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setSelectedTool,
    canvasAddFrame,
    canvasRemoveFrame,
    canvasUpdateMax,
    updateCurrFrame,
    toggleLightbox,
    setLightboxFrames
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolSelector);