import React from 'react';
import { Tab } from 'semantic-ui-react';
import BrushSettings from './ToolSelector/BrushSettings';
import ToolSelector from './ToolSelector/ToolSelector';

const Toolbar = () => {
    
    const panes = [
        {menuItem: 'Drawing', render: () => <Tab.Pane><BrushSettings /></Tab.Pane>},
        {menuItem: 'Animation', render: () => <Tab.Pane><ToolSelector /></Tab.Pane>},
    ];

    return (
        <div className='flex-container flex-column align-items-center'>
            <Tab style={{width: '100%'}} panes={panes} />
        </div>
    );
}

export default Toolbar;


