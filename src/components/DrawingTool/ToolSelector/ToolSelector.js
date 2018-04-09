import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input } from 'semantic-ui-react';
import { setSelectedTool, canvasUndo, canvasRedo } from '../../../actions';
import paintBucket from './paint-bucket.svg';

const ToolSelector = ({ selectedTool, setSelectedTool, canvasUndo, canvasRedo }) => {
    const determineToolToToggle = (e, setSelectedTool, tool) => {
        setSelectedTool(tool);
    }
    return (
        <div>
            <div className='flex-container flex-row justify-content-space-between'>
                <div onTouchStart={(e) => determineToolToToggle(e, setSelectedTool, 'BRUSH')} 
                    className={
                        (selectedTool === 'BRUSH' ? 'DrawingTool-isSelected ': '') + ('DrawingTool-iconContainer flex-container justify-content-center align-items-center')
                    }>
                    <i className="fas fa-paint-brush fa-2x"></i>
                </div>
                <div onTouchStart={(e) => determineToolToToggle(e, setSelectedTool, 'BUCKET')} 
                    className={
                        (selectedTool === 'BUCKET' ? 'DrawingTool-isSelected ': '') + ('DrawingTool-iconContainer flex-container justify-content-center align-items-center')
                    }>
                    <img src={paintBucket} width='28' height='28.5'/>
                </div>
                <div onTouchStart={canvasUndo}
                    className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-undo fa-2x"></i>
                </div>
            </div>
            <div className='flex-container flex-row justify-content-space-between'>
                <div onTouchStart={(e) => determineToolToToggle(e, setSelectedTool, 'ERASER')} 
                    className={
                        (selectedTool === 'ERASER' ? 'DrawingTool-isSelected ': '') + ('DrawingTool-iconContainer flex-container justify-content-center align-items-center')
                    }>
                    <i className="fas fa-eraser fa-2x"></i>
                </div>
                <div onTouchStart={(e) => determineToolToToggle(e, setSelectedTool, 'BOMB')} 
                    className={
                        (selectedTool === 'BOMB' ? 'DrawingTool-isSelected ': '') + ('DrawingTool-iconContainer flex-container justify-content-center align-items-center')
                    }>
                    <i className="fas fa-bomb fa-2x"></i>
                </div>
                <div onTouchStart={canvasRedo}
                    className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="fas fa-redo fa-2x"></i>
                </div>
            </div>
            <div className='flex-container flex-row justify-content-space-between'>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i className="far fa-lightbulb fa-2x"></i>
                </div>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <Input placeholder={1} type='number'>
                        <input
                            style={{width: "50px"}} />
                    </Input>
                </div>
                <div className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                    <i class="fas fa-save fa-2x"></i>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    selectedTool: state.selectedTool
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setSelectedTool, canvasUndo, canvasRedo
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolSelector);