import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
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

