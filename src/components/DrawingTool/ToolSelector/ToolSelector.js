import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input } from 'semantic-ui-react';
import { setSelectedTool, canvasUndo, canvasRedo } from '../../../actions';
import paintBucket from './paint-bucket.svg';
import axios from 'axios';
const BaseUrl = 'http://localhost:8080';

const ToolSelector = ({ selectedTool, setSelectedTool, canvasUndo, canvasRedo, flipbook, canvasSaveData }) => {

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
            .catch(err => {
                console.log(err);
            }); 
    }

    return (
        <div>
           
            <div className='flex-container flex-row justify-content-center'>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="far fa-lightbulb fa-2x"></i>
                </div>
                
                <Input placeholder={1} type='number'>
                    <input
                        style={{width: "50px"}} />
                </Input>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-angle-left fa-2x"></i>
                </div>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <p>Frame: {canvasSaveData.frame} / 100</p>
                </div>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-angle-right fa-2x"></i>
                </div>
            </div>
            <div className='flex-container flex-row justify-content-center'>
                
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-play fa-2x"></i>
                </div>
                <div onClick={() => saveToServer(flipbook, canvasSaveData)}
                    className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i class="fas fa-save fa-2x"></i>
                </div>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-plus-circle fa-2x"></i>
                </div>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-trash-alt fa-2x"></i>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    selectedTool: state.selectedTool,
    flipbook: state.flipbook,
    canvasSaveData: state.canvasSave
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setSelectedTool, canvasUndo, canvasRedo
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolSelector);