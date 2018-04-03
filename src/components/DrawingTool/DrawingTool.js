import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import DrawingCanvas from './DrawingCanvas/DrawingCanvas'
import Toolbar from './Toolbar';
import './DrawingTool.css';

class DrawingTool extends Component {
    state = {
        panes: [
            { menuItem: 'Toolbar', render: () => <Tab.Pane><Toolbar /></Tab.Pane> },
            { menuItem: 'Animation', render: () => <Tab.Pane>Animation Content</Tab.Pane> },
            { menuItem: 'Settings', render: () => <Tab.Pane>Settings Content</Tab.Pane> },
        ]
    }

    render() {
        return (
            <div style={this.props.bodyMargin}>
                <DrawingCanvas />
                <div className='DrawingTool-tabsContainer'>
                    <Tab panes={this.state.panes} />
                </div>
            </div>
        );
    }
}

export default DrawingTool;

