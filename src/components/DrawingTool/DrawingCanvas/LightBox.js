import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
const BaseUrl = 'http://localhost:8080';

class Lightbox extends Component {
    componentDidMount() {
        // Set canvas context
        const canvas = this.myLightBox;
        const ctx = canvas.getContext('2d');
        const modelWidth = 370;
        const maxWidth = 600;
        const marginPixels = 42;
        let canvasWidth = (window.innerWidth-marginPixels);
        
        // construct canvas element
        if (canvasWidth > maxWidth) canvasWidth = maxWidth; 
        canvas.width = canvasWidth;
        canvas.height = canvas.width;
        
        let scaleFactor = canvasWidth/modelWidth;
        ctx.scale(scaleFactor, scaleFactor);
        

    }

    loadLightBox = (name, index, frames) => {
        const canvas = this.myLightBox;
        const ctx = canvas.getContext('2d');
        const modelWidth = 370;
        let scaleFactor = canvas.width/modelWidth;
        axios.get(`${BaseUrl}/flipbooks/My%20Test%20Flipbook/frames/2?lightBox=3`)
            .then(res => {
                let frames = res.data.data;
                frames.forEach(frame => {
                    let img = new Image;
                    img.onload= () => {
                        ctx.drawImage(img, 0, 0);
                        ctx.scale(scaleFactor, scaleFactor);
                        ctx.scale(1/scaleFactor, 1/scaleFactor);
                    }
                    img.src = frame.imgURL;
                });
            })
    }
    
    clearLightBox = () => {
        const canvas = this.myLightBox;
        const ctx = canvas.getContext('2d');
        const modelWidth = 370;
        let scaleFactor = canvas.width/modelWidth;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    render() {
        return (
            <canvas id='DrawingTool-lightbox'
                ref={(c => this.myLightBox = c)}>
            </canvas>            
        );
    }
}

const mapStateToProps = (state) => ({
    scaleFactor: state.scaleFactor,
    canvasSaveData: state.canvasSave
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lightbox);