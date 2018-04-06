import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBrushPos, toggleCanPaint, setScaleFactor, canvasSave } from '../../../actions';

let currIndex = -1

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
        if (canvasWidth > maxWidth) canvasWidth = maxWidth; 
        canvas.width = canvasWidth;
        canvas.height = canvas.width;

        // Fill canvas with selected eraser color
        ctx.fillStyle = `rgb(${this.props.eraserColor.r}, ${this.props.eraserColor.g}, ${this.props.eraserColor.b})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let scaleFactor = canvasWidth/modelWidth;
        ctx.scale(scaleFactor, scaleFactor);
        this.props.setScaleFactor(scaleFactor);
    }

    brushStartTouch = (e, tool, scaleFactor, brushColor, eraserColor, setBrushPos, toggleCanPaint, canvasSave) => {
        e.preventDefault();
        const canvas = this.myCanvas;
        let brushX = (e.touches[0].pageX - canvas.offsetLeft) / scaleFactor;
        let brushY = (e.touches[0].pageY - canvas.offsetTop) / scaleFactor;
        if (tool === 'BRUSH' || tool === 'ERASER') {
            setBrushPos({ x: brushX, y: brushY });
            toggleCanPaint(true);
        }
        if (tool === 'BUCKET') {
            this.fillWithBucket(canvas, brushX, brushY, scaleFactor, brushColor, canvasSave)
        }
        if (tool === 'BOMB') {
            this.clearScreen(canvas, eraserColor, canvasSave);
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

    brushLeaveTouch = (e, setBrushPos, toggleCanPaint, canPaint, canvasSave) => {
        setBrushPos(null);
        if (canPaint) {
            let canvas = this.myCanvas;
            let imgURL = canvas.toDataURL();
            canvasSave(imgURL);
            currIndex++
        }
        toggleCanPaint(false);
    }

    clearScreen = (canvas, eraserColor, canvasSave) => {
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = `rgb(${this.props.eraserColor.r}, ${this.props.eraserColor.g}, ${this.props.eraserColor.b})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let imgURL = canvas.toDataURL();
        canvasSave(imgURL);
        currIndex++
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

    fillWithBucket = (canvas, brushX, brushY, scaleFactor, color, canvasSave) => {
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
        let imgDataToSave = canvas.toDataURL();
        canvasSave(imgDataToSave)
        currIndex++
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

        let canvas = this.myCanvas;
        console.log(this.props.canvasSaveData.index, currIndex);
        if (canvas && this.props.canvasSaveData.index !== currIndex) {
          
          let ctx = canvas.getContext('2d');
          if(this.props.canvasSaveData.index > -1) {
            let img = new Image();
            img.onload = () => {
              ctx.scale(1/this.props.scaleFactor, 1/this.props.scaleFactor);
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);
              ctx.scale(this.props.scaleFactor, this.props.scaleFactor);
            }
            img.src = this.props.canvasSaveData.imageHistory[this.props.canvasSaveData.index];
            currIndex = this.props.canvasSaveData.index
          } else {
            
            ctx.scale(1/this.props.scaleFactor, 1/this.props.scaleFactor);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.scale(this.props.scaleFactor, this.props.scaleFactor);
            currIndex = this.props.canvasSaveData.index
          }
        }
        console.log(this.props.canvasSaveData.index, currIndex);
        return (
            <canvas id='DrawingTool-canvas' 
                ref={(c => this.myCanvas = c)}
                onTouchStart={(e) => this.brushStartTouch(e, this.props.selectedTool, this.props.scaleFactor,
                                                        this.props.brushColor, this.props.eraserColor, 
                                                        this.props.setBrushPos, this.props.toggleCanPaint,
                                                         this.props.canvasSave)}
                onTouchMove={(e) => this.brushMoveTouch(e, this.props.canPaint, this.props.selectedTool, 
                                                        this.props.brushColor, this.props.eraserColor, 
                                                        this.props.scaleFactor, this.props.brushSize,
                                                        this.props.setBrushPos, this.props.brushPos)}
                onTouchEnd={(e) => this.brushLeaveTouch(e, this.props.setBrushPos, 
                                                    this.props.toggleCanPaint, this.props.canPaint,
                                                     this.props.canvasSave)} >
            </canvas>
        );
    }
}

const mapStateToProps = (state) => ({
    brushColor: state.brushColor,
    eraserColor: state.eraserColor,
    selectedTool: state.selectedTool,
    brushSize: state.brushSize,
    brushPos: state.brushPos,
    canPaint: state.canPaint,
    scaleFactor: state.scaleFactor,
    canvasSaveData: state.canvasSave
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setBrushPos,
    toggleCanPaint,
    setScaleFactor,
    canvasSave
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawingCanvas);