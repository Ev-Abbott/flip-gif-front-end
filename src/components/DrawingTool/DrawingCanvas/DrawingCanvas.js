import React, { Component } from 'react';

class DrawingCanvas extends Component {
    componentDidMount() {
        // Set canvas context
        const canvas = this.myCanvas;
        const ctx = canvas.getContext('2d');
        const modelWidth = 320;
        const maxWidth = 640;
        const marginPixels = 42;
        let canvasWidth = (window.innerWidth-marginPixels);

        // construct canvas element
        if (canvasWidth > maxWidth) {
            canvasWidth = maxWidth; 
        } 

        canvas.width = canvasWidth;
        canvas.height = canvas.width;
        let scaleFactor = canvasWidth/modelWidth;

        // placeholder img for testing
        let img = new Image();
        img.src = "http://via.placeholder.com/320x320";
        img.onload = () => {
            ctx.save();
            ctx.scale(scaleFactor, scaleFactor);
            ctx.drawImage(img, 0, 0)
        }
    }
    brushStart = (e) => {
        e.preventDefault();
        console.log('Here');
    }
    brushMove = (e) => {
        e.preventDefault();
        console.log('Working');
    }
    render() {
        return (
            <canvas id='DrawingTool-canvas' 
                ref={(c => this.myCanvas = c)}
                onTouchStart={this.brushStart}
                onTouchMove={this.brushMove} >
            </canvas>
        );
    }
}

export default DrawingCanvas;