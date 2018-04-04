import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBrushPos } from '../../../actions';

class DrawingCanvas extends Component {
    state = {
        paint: false,
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
        if (canvasWidth > maxWidth) canvasWidth = maxWidth; 
        canvas.width = canvasWidth;
        canvas.height = canvas.width;

        // Fill canvas with selected eraser color
        ctx.fillStyle = `rgb(${this.props.eraserColor.r}, ${this.props.eraserColor.g}, ${this.props.eraserColor.b})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let scaleFactor = canvasWidth/modelWidth;
        ctx.scale(scaleFactor, scaleFactor);

        this.setState({ scaleFactor });
    }

    brushStartTouch = (e, tool, scaleFactor, brushColor, eraserColor, setBrushPos) => {
        e.preventDefault();
        const canvas = this.myCanvas;
        let brushX = (e.touches[0].pageX - canvas.offsetLeft) / scaleFactor;
        let brushY = (e.touches[0].pageY - canvas.offsetTop) / scaleFactor;
        if (tool === 'BRUSH' || tool === 'ERASER') {
            setBrushPos({ x: brushX, y: brushY });
            this.setState({ paint: true })
        }
        if (tool === 'BUCKET') {
            this.fillWithBucket(canvas, brushX, brushY, scaleFactor, brushColor)
        }
        if (tool === 'BOMB') {
            this.clearScreen(canvas, eraserColor);
        }
    }

    brushMoveTouch = (e, paintState, tool, brushColor, eraserColor, scaleFactor, brushSize, setBrushPos, brushPos) => {
        e.preventDefault();
        if (paintState) {
            const canvas = this.myCanvas;
            const ctx = canvas.getContext('2d');
            let brushX = (e.touches[0].pageX - canvas.offsetLeft) / scaleFactor;
            let brushY = (e.touches[0].pageY - canvas.offsetTop) / scaleFactor;
            let color;
            if (tool === 'BRUSH') {
                color = brushColor;
                this.drawToCanvas(ctx, brushX, brushY, color, brushSize, setBrushPos, brushPos);
            }
            if (tool === 'ERASER') {
                color = eraserColor;
                this.drawToCanvas(ctx, brushX, brushY, color, brushSize, setBrushPos, brushPos);
            }
        }
    }

    brushLeaveTouch = (e, setBrushPos) => {
        setBrushPos(null);
        this.setState({ paint: false });
    }

    clearScreen = (canvas, eraserColor) => {
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = `rgb(${this.props.eraserColor.r}, ${this.props.eraserColor.g}, ${this.props.eraserColor.b})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawToCanvas = (ctx, brushX, brushY, color, brushSize, setBrushPos, brushPos) => {
        ctx.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.lineCap ='round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = brushSize;
        ctx.beginPath();
        ctx.moveTo(brushPos.x, brushPos.y);
        ctx.lineTo(brushX, brushY);
        ctx.stroke();
        ctx.closePath();
        setBrushPos({ x: brushX, y: brushY });
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
                                                        this.props.brushColor, this.props.eraserColor, this.props.setBrushPos)}
                onTouchMove={(e) => this.brushMoveTouch(e, this.state.paint, this.props.selectedTool, 
                                                        this.props.brushColor, this.props.eraserColor, 
                                                        this.state.scaleFactor, this.props.brushSize,
                                                        this.props.setBrushPos, this.props.brushPos)}
                onTouchEnd={(e) => this.brushLeaveTouch(e, this.props.setBrushPos)} >
            </canvas>
        );
    }
}

const mapStateToProps = (state) => ({
    brushColor: state.brushColor,
    eraserColor: state.eraserColor,
    selectedTool: state.selectedTool,
    brushSize: state.brushSize,
    brushPos: state.brushPos
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setBrushPos
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawingCanvas);