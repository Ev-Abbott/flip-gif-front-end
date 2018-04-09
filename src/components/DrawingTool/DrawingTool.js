import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import LightBox from './DrawingCanvas/LightBox';
import DrawingCanvas from './DrawingCanvas/DrawingCanvas'
import Toolbar from './Tabs/Toolbar';
import AnimationTab from './Tabs/Animation';
import SettingsTab from './Tabs/Settings';
import './DrawingTool.css';

class DrawingTool extends Component {
    state = {
        panes: [
            { menuItem: 'Toolbar', render: () => <Tab.Pane className='header-styled-text'><Toolbar /></Tab.Pane> },
            { menuItem: 'Animation', render: () => <Tab.Pane className='header-styled-text'><AnimationTab /></Tab.Pane> },
            { menuItem: 'Settings', render: () => <Tab.Pane className='header-styled-text'><SettingsTab /></Tab.Pane> },
        ]
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
                    <Tab panes={this.state.panes} />
                </div>
            </div>
            
        );
    }
}

export default DrawingTool;

