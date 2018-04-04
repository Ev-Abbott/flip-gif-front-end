import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class DrawingCanvas extends Component {
    state = {
        paint: false,
        x: null,
        y: null,
        size: 5,
        scaleFactor: 0
    }

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
        ctx.fillRect(20,20,10,10);
        ctx.fillRect(canvasWidth-20, canvasWidth-20, 10, 10);
        ctx.scale(scaleFactor, scaleFactor);

        this.setState({ scaleFactor });
    }

    brushStartTouch = (e, tool, scaleFactor, brushColor, eraserColor) => {
        e.preventDefault();
        const canvas = this.myCanvas;
        let brushX = (e.touches[0].pageX - canvas.offsetLeft) / scaleFactor;
        let brushY = (e.touches[0].pageY - canvas.offsetTop) / scaleFactor;
        if (tool === 'BRUSH' || tool === 'ERASER') {
            this.setState({ paint: true, x: brushX, y: brushY })
        }
        if (tool === 'BUCKET') {
            this.fillWithBucket(canvas, brushX, brushY, scaleFactor, brushColor)
        }
    }

    brushMoveTouch = (e, paintState, tool, brushColor, eraserColor, scaleFactor) => {
        e.preventDefault();
        if (paintState) {
            const canvas = this.myCanvas;
            const ctx = canvas.getContext('2d');
            let brushX = (e.touches[0].pageX - canvas.offsetLeft) / scaleFactor;
            let brushY = (e.touches[0].pageY - canvas.offsetTop) / scaleFactor;
            let color;
            if (tool === 'BRUSH') {
                color = brushColor;
                this.drawToCanvas(ctx, brushX, brushY, color);
            }
            if (tool === 'ERASER') {
                color = eraserColor;
                this.drawToCanvas(ctx, brushX, brushY, color);
            }
        }
    }

    brushLeaveTouch = (e) => {
        this.setState({ paint: false, x: null, y: null });
    }

    brushStartMouse = (e, tool, scaleFactor, brushColor) => {
        e.preventDefault();
        const canvas = this.myCanvas;
        let brushX = (e.pageX - canvas.offsetLeft) / scaleFactor;
        let brushY = (e.pageY - canvas.offsetTop) / scaleFactor;
        if (tool === 'BRUSH' || tool === 'ERASER') {
            this.setState({ paint: true, x: brushX, y: brushY })
        }
        if (tool === 'BUCKET') {
            this.fillWithBucket(canvas, brushX, brushY, scaleFactor, brushColor)
        }
    }
    
    brushMoveMouse = (e, paintState, tool, brushColor, eraserColor, scaleFactor) => {
        e.preventDefault();
        if (paintState) {
            const canvas = this.myCanvas;
            const ctx = canvas.getContext('2d');
            let brushX = (e.pageX - canvas.offsetLeft) / scaleFactor;
            let brushY = (e.pageY - canvas.offsetTop) / scaleFactor;
            let color;
            if (tool === 'BRUSH') {
                color = brushColor;
                this.drawToCanvas(ctx, brushX, brushY, color);
            }
            if (tool === 'ERASER') {
                color = eraserColor;
                this.drawToCanvas(ctx, brushX, brushY, color);
            }
        }
    }

    brushLeaveMouse = (e) => {
        console.log('Mouse left');
        this.setState({ paint: false, x: null, y: null });
    }

    drawToCanvas = (ctx, brushX, brushY, color) => {
        ctx.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.lineCap ='round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = this.state.size;
        ctx.beginPath();
        ctx.moveTo(this.state.x, this.state.y);
        ctx.lineTo(brushX, brushY);
        ctx.stroke();
        ctx.closePath();
        this.setState({ x: brushX, y: brushY });
    }

    fillWithBucket = (canvas, brushX, brushY, scaleFactor, color) => {
        let ctx = canvas.getContext('2d');
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let imgArray = [];
        let imgMatrix = [];
        for (let i = 0; i < imgData.data.length; i+=4) {
            imgArray.push([ imgData.data[i], imgData.data[i+1], imgData.data[i+2], imgData.data[i+3] ]);
        }
        let j = -1;
        for (let i = 0; i < imgArray.length; i++) {
            if (i % canvas.width === 0) {
                j++;
                imgMatrix[j] = [];
            }
            imgMatrix[j].push(imgArray[i]);
        }
        let fillX = Math.floor(brushX * scaleFactor);
        let fillY = Math.floor(brushY * scaleFactor);
        let selectedColor = imgMatrix[fillY][fillX];
        let fillColor = [color.r, color.g, color.b, 255];
        this.fill(imgMatrix, fillY, fillX, fillColor, selectedColor, canvas.width);
        let newImgArr = this.flatten(imgMatrix);
        let newImgData = this.flatten(newImgArr);
        let imgToRender = new Uint8ClampedArray(newImgData);
        imgData.data.set(imgToRender);
        ctx.putImageData(imgData, 0, 0);
    }

    fill = (imgMatrix, y, x, desiredColor, selectedColor, width) => {
        let isFillImpossible = this.checkPixelColors(desiredColor, selectedColor);
        if (isFillImpossible) return;
        let stack = [ [y, x] ];
        while (stack.length > 0) {
            let coordinates = stack.pop();
            let yPos = coordinates[0];
            let xPos = coordinates[1];
            let setPixel = (yPos >= 0 && yPos < width) && (xPos >= 0 && xPos < width);
            let pixelToCheck;
            if (setPixel) {
               pixelToCheck = imgMatrix[yPos][xPos]; 
            }
            let isTheSameColor = false;
            if (pixelToCheck) {
                isTheSameColor = this.checkPixelColors(selectedColor, pixelToCheck);
            }
            if (isTheSameColor) {
                imgMatrix[yPos][xPos] = desiredColor;
                stack.push([ yPos + 1, xPos]);
                stack.push([ yPos - 1, xPos]);
                stack.push([ yPos, xPos + 1]);
                stack.push([ yPos, xPos - 1]);
            }
        }
    }

    checkPixelColors = (oldColor, surface) => {
        for (let i = 0; i < oldColor.length; i++) {
            if (oldColor[i] !== surface[i]) return false;
        }
        return true;
    }

    flatten = (array) => {
        let flattened = []
        for (let i = 0; i < array.length; i++) {
            let current = array[i];
            for (let j = 0; j < current.length; j++) {
                flattened.push(current[j]);
            }
        }
        return flattened;
    }

    render() {
        return (
            <canvas id='DrawingTool-canvas' 
                ref={(c => this.myCanvas = c)}
                onTouchStart={(e) => this.brushStartTouch(e, this.props.selectedTool, this.state.scaleFactor,
                                                        this.props.brushColor, this.props.eraserColor)}
                onTouchMove={(e) => this.brushMoveTouch(e, this.state.paint, this.props.selectedTool, 
                                                        this.props.brushColor, this.props.eraserColor, 
                                                        this.state.scaleFactor)}
                onTouchEnd={(e) => this.brushLeaveTouch(e)} 
                onMouseDown={(e) => this.brushStartMouse(e, this.props.selectedTool, this.state.scaleFactor, this.props.brushColor)}
                onMouseMove={(e) => this.brushMoveMouse(e, this.state.paint, this.props.selectedTool, 
                                                    this.props.brushColor, this.props.eraserColor, 
                                                    this.state.scaleFactor)}
                onMouseLeave={(e) => this.brushLeaveMouse(e)}
                onMouseUp={(e) => this.brushLeaveMouse(e)}>
            </canvas>
        );
    }
}

const mapStateToProps = (state) => ({
    brushColor: state.brushColor,
    eraserColor: state.eraserColor,
    selectedTool: state.selectedTool
});

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawingCanvas);