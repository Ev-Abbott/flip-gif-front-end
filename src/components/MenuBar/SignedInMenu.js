import React, { Component } from 'react';
import { Sidebar, Segment, Icon, Button, Header, Container, Dropdown, Image, Menu } from 'semantic-ui-react';

const SignedInMenu = ({ toggleVisibility }) => {
    return (
        <div>
            <Menu.Item name='home'>
                <Icon name='home' />
                Home
            </Menu.Item>
            <Menu.Item name='draw'>
                <Icon name='paint brush' />
                Let's Draw!
            </Menu.Item>
            <Menu.Item name='logout'>
                <Icon name='sign out' />
                Sign Out
            </Menu.Item>
            <Menu.Item name='close' onClick={toggleVisibility}>
                <Icon name='window close' />
                Close
            </Menu.Item>
        </div>
        
    );
}

export default SignedInMenu;

