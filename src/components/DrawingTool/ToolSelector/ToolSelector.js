import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSelectedTool } from '../../../actions/index';
import paintBucket from './paint-bucket.svg';

const ToolSelector = ({ selectedTool, setSelectedTool }) => {
    const determineToolToToggle = (e, setSelectedTool, tool) => {
        setSelectedTool(tool);
    }
    return (
        <div>
            <div className='flex-container flex-row justify-content-space-between'>
                <div onClick={(e) => determineToolToToggle(e, setSelectedTool, 'BRUSH')} 
                    className={
                        (selectedTool === 'BRUSH' ? 'DrawingTool-isSelected ': '') + ('DrawingTool-iconContainer flex-container justify-content-center align-items-center')
                    }>
                    <i className="fas fa-paint-brush fa-lg"></i>
                </div>
                <div onClick={(e) => determineToolToToggle(e, setSelectedTool, 'BUCKET')} 
                    className={
                        (selectedTool === 'BUCKET' ? 'DrawingTool-isSelected ': '') + ('DrawingTool-iconContainer flex-container justify-content-center align-items-center')
                    }>
                    <img src={paintBucket} width='19' height='16'/>
                </div>
            </div>
            <div className='flex-container flex-row justify-content-space-between'>
                <div onClick={(e) => determineToolToToggle(e, setSelectedTool, 'ERASER')} 
                    className={
                        (selectedTool === 'ERASER' ? 'DrawingTool-isSelected ': '') + ('DrawingTool-iconContainer flex-container justify-content-center align-items-center')
                    }>
                    <i className="fas fa-eraser fa-lg"></i>
                </div>
                <div onClick={(e) => determineToolToToggle(e, setSelectedTool, 'BOMB')} 
                    className={
                        (selectedTool === 'BOMB' ? 'DrawingTool-isSelected ': '') + ('DrawingTool-iconContainer flex-container justify-content-center align-items-center')
                    }>
                    <i className="fas fa-bomb fa-lg"></i>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    selectedTool: state.selectedTool
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setSelectedTool
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolSelector);