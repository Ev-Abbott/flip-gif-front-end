import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import LightBox from './DrawingCanvas/LightBox';
import DrawingCanvas from './DrawingCanvas/DrawingCanvas'
import Toolbar from './Toolbar';

import './DrawingTool.css';

class DrawingTool extends Component {
    componentDidMount() {
        let token = localStorage.getItem('token');
        if (!token) this.props.history.push('/login');
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
                <LightBox />
                <div style={{ position: 'relative', top: this.calculateSize(), margin: '0px 20px 0px 20px' }}>
                    <Toolbar />
                </div>
            </div>
            
        );
    }
}

export default withRouter(DrawingTool);

