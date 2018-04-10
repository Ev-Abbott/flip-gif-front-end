import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFlipbook, canvasInitialize } from '../../actions';
import { withRouter } from 'react-router-dom';
import LightBox from './DrawingCanvas/LightBox';
import DrawingCanvas from './DrawingCanvas/DrawingCanvas'
import Toolbar from './Toolbar';

import './DrawingTool.css';

const BaseUrl = 'http://localhost:8080';

class DrawingTool extends Component {
    componentDidMount() {
        let token = localStorage.getItem('token');
        if (!token) return this.props.history.push('/login');
        let user_id = localStorage.getItem('user_id');
        return axios.get(`${BaseUrl}/flipbooks?user_id=${user_id}`)
            .then(res => {
                let flipbook = res.data.data[0];
                this.props.setFlipbook(flipbook);
                return axios.get(`${BaseUrl}/flipbooks/${flipbook.name}/frames/${this.props.canvasSaveData.frame}`);
            })
            .then(res => {
                if (!res.data.data) {
                    let dummyCanvas = document.createElement('canvas');
                    let ctx = dummyCanvas.getContext('2d');
                    dummyCanvas.width = 600;
                    dummyCanvas.height = 600;
                    ctx.clearRect(0, 0, 600, 600);
                    let imgData = dummyCanvas.toDataURL();
                    this.props.canvasInitialize(imgData);
                } else {
                    this.props.canvasInitialize(res.data.data.imgURL);
                } 
            })
            .catch(err => {
                console.log(err);
            });
    }
    calculateSize = () => {
        const maxWidth = 642;
        let canvasWidth = window.innerWidth;
        if (canvasWidth > maxWidth) canvasWidth = maxWidth; 
        return canvasWidth;
    }

    render() {
        return (
            <div style={{ position: 'relative', top: '3em'}}>
                
                <DrawingCanvas />
                { this.props.lightbox.isActive ? <LightBox /> : ''}
                <div style={{ position: 'relative', top: this.calculateSize(), margin: '0px 20px 0px 20px'}}>
                    <Toolbar />
                </div>
            </div>
            
        );
    }
}

const mapStateToProps = (state) => ({
    flipbook: state.flipbook,
    canvasSaveData: state.canvasSave,
    lightbox: state.lightBox
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setFlipbook,
    canvasInitialize
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawingTool));


