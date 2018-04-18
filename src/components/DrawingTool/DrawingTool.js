import React, { Component } from 'react';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import { isBrowser, BrowserView, isMobile, MobileView } from 'react-device-detect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFlipbook, canvasInitialize } from '../../actions';
import { withRouter } from 'react-router-dom';
import LightBox from './DrawingCanvas/LightBox';
import DrawingCanvas from './DrawingCanvas/DrawingCanvas'
import Toolbar from './Toolbar';

import './DrawingTool.css';

const BaseUrl = 'https://flipgif-backend.herokuapp.com';

class DrawingTool extends Component {
    componentDidMount() {
        let token = localStorage.getItem('token');
        if (!token) return this.props.history.push('/login');
        let user_id = localStorage.getItem('user_id');
        return axios.get(`${BaseUrl}/flipbooks?user_id=${user_id}`)
            .then(res => {
                let flipbook = res.data.data[0];
                this.props.setFlipbook(flipbook);
                return axios.get(`${BaseUrl}/flipbooks/${flipbook.name}/frames/${this.props.canvasSaveData.frame}`, { headers: {token} });
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
                <BrowserView device={isBrowser}>
                    <Header textAlign='center' style={{ marginTop: '2em' }} as='h1'> The drawing application is supported on mobile devices only. We apologize for the inconvenience. </Header>
                </BrowserView>
                <MobileView device={isMobile}>
                    
                    { this.props.animation.isActive ? <img src={this.props.animation.imgURL} 
                                                        alt='Your animation you made!'
                                                        style={{
                                                            zIndex: 99,
                                                            position: 'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            width: this.calculateSize() - 42,
                                                            height: this.calculateSize() - 42,
                                                            margin: '20px',
                                                            border: '1px solid #CCC',
                                                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                                            borderRadius: '5px'}} /> : ''}
                    <DrawingCanvas />
                    { this.props.lightbox.isActive ? <LightBox /> : ''}
                    <div style={{ position: 'relative', top: this.calculateSize(), margin: '0px 20px 0px 20px'}}>
                        <Toolbar />
                    </div>
                </MobileView>
            </div>
            
        );
    }
}

const mapStateToProps = (state) => ({
    flipbook: state.flipbook,
    canvasSaveData: state.canvasSave,
    lightbox: state.lightBox,
    animation: state.animation
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setFlipbook,
    canvasInitialize
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawingTool));




