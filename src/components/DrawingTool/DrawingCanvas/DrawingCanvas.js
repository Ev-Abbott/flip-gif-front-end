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

        ctx.scale(scaleFactor, scaleFactor);
        
        this.setState({ scaleFactor });
    }

    brushStartTouch = (e, tool, scaleFactor) => {
        e.preventDefault();
        const canvas = this.myCanvas;
        let brushX = (e.touches[0].pageX - canvas.offsetLeft) / scaleFactor;
        let brushY = (e.touches[0].pageY - canvas.offsetTop) / scaleFactor;
        if (tool === 'BRUSH' || tool === 'ERASER') {
            this.setState({ paint: true, x: brushX, y: brushY })
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
            }
            if (tool === 'ERASER') {
                color = eraserColor;
            }
            this.drawToCanvas(ctx, brushX, brushY, color);
        }
    }

    brushLeaveTouch = (e) => {
        console.log('Touch Left');
        this.setState({ paint: false, x: null, y: null });
    }

    brushStartMouse = (e, tool, scaleFactor) => {
        e.preventDefault();
        const canvas = this.myCanvas;
        let brushX = (e.pageX - canvas.offsetLeft) / scaleFactor;
        let brushY = (e.pageY - canvas.offsetTop) / scaleFactor;
        if (tool === 'BRUSH' || tool === 'ERASER') {
            this.setState({ paint: true, x: brushX, y: brushY })
        }
    }
    
    brushMoveMouse = (e, paintState, tool, brushColor, eraserColor, scaleFactor) => {
        e.preventDefault();
        if (paintState) {
            const canvas = this.myCanvas;
            const ctx = canvas.getContext('2d');
            let brushX = (e.pageX - canvas.offsetLeft) / scaleFactor;
            let brushY = (e.pageY - canvas.offsetTop) / scaleFactor;
            console.log(brushX, brushY)
            let color;
            if (tool === 'BRUSH') {
                color = brushColor;
            }
            if (tool === 'ERASER') {
                color = eraserColor;
            }
            this.drawToCanvas(ctx, brushX, brushY, color);
        }
    }

    brushLeaveMouse = (e) => {
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

    render() {
        return (
            <canvas id='DrawingTool-canvas' 
                ref={(c => this.myCanvas = c)}
                onTouchStart={(e) => this.brushStartTouch(e, this.props.selectedTool, this.state.scaleFactor)}
                onTouchMove={(e) => this.brushMoveTouch(e, this.state.paint, this.props.selectedTool, this.props.brushColor, this.props.eraserColor, this.state.scaleFactor)}
                onTouchCancel={(e) => this.brushLeaveTouch(e)} 
                onMouseDown={(e) => this.brushStartMouse(e, this.props.selectedTool, this.state.scaleFactor)}
                onMouseMove={(e) => this.brushMoveMouse(e, this.state.paint, this.props.selectedTool, this.props.brushColor, this.props.eraserColor, this.state.scaleFactor)}
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