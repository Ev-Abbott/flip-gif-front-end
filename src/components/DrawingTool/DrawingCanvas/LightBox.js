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
        const modelWidth = 300;
        const maxWidth = 600;
        const marginPixels = 42;
        let canvasWidth = (window.innerWidth-marginPixels);
        
        // construct canvas element
        if (canvasWidth > maxWidth) canvasWidth = maxWidth; 
        canvas.width = canvasWidth;
        canvas.height = canvas.width;
        
        ctx.scale(this.props.scaleFactor, this.props.scaleFactor);
        this.initializeLightBox(canvas);
    }

    initializeLightBox = (canvas) => {
        const ctx = canvas.getContext('2d');
        if (this.props.lightbox.frames === '' || 0) return;
        axios.get(`${BaseUrl}/flipbooks/${this.props.flipbook.name}/frames/${this.props.canvasSaveData.frame}?lightBox=${this.props.lightbox.frames}`)
            .then(res => {
                console.log(res.data);
                let frames = res.data.data;
                frames.forEach(frame => {
                    let img = new Image();
                    img.onload = () => {
                        ctx.scale(1/this.props.scaleFactor, 1/this.props.scaleFactor);
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        ctx.scale(this.props.scaleFactor, this.props.scaleFactor);
                    }
                    img.src = frame.imgURL;
                });
            })
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
    canvasSaveData: state.canvasSave,
    lightbox: state.lightBox,
    flipbook: state.flipbook
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lightbox);