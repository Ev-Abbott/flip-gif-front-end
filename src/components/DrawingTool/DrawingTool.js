import React, { Component } from 'react';
import { Container, Header, Tab } from 'semantic-ui-react';
import './DrawingTool.css';

class DrawingTool extends Component {
    state = {
        panes: [
            { menuItem: 'Toolbar', render: () => <Tab.Pane>Toolbar Content</Tab.Pane> },
            { menuItem: 'Animation', render: () => <Tab.Pane>Animation Content</Tab.Pane> },
            { menuItem: 'Settings', render: () => <Tab.Pane>Settings Content</Tab.Pane> },
        ]
    }
    componentDidMount() {
        // Set canvas context
        const canvas = this.myCanvas;
        const ctx = canvas.getContext('2d');
        const modelWidth = 320;
        const marginPixels = 42;
        const scaleFactor = (window.innerWidth-marginPixels)/modelWidth;
        // construct canvas element
        canvas.width = window.innerWidth-marginPixels;
        canvas.height = canvas.width;

        // placeholder img for testing
        let img = new Image();
        img.src = "http://via.placeholder.com/320x320";
        img.onload = () => {
            ctx.save();
            ctx.scale(scaleFactor, scaleFactor);
            ctx.drawImage(img, 0, 0)
        }
    }

    render() {
        return (
            <div style={this.props.bodyMargin}>
                <canvas id='DrawingTool-canvas' ref={(c => this.myCanvas = c)}></canvas>
                <Tab panes={this.state.panes} />
            </div>
        );
    }
}

export default DrawingTool;

