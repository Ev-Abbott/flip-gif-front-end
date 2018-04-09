import React, { Component } from 'react';
import { Sidebar, Segment, Icon, Button, Header, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

const SignedInMenu = ({ toggleVisibility }) => {
    return (
        <div>
            <Link to='/'>
                <Menu.Item name='home' onClick={toggleVisibility}>
                    <Icon name='home' />
                    Home
                </Menu.Item>
            </Link>
            <Link to='/draw'>
                <Menu.Item name='draw' onClick={toggleVisibility}>
                    <Icon name='paint brush' />
                    Let's Draw!
                </Menu.Item>
            </Link>
            <Link to='/'>
                <Menu.Item name='logout' onClick={toggleVisibility}>
                    <Icon name='sign out' />
                    Sign Out
                </Menu.Item>
            </Link>
            <Menu.Item name='close' onClick={toggleVisibility}>
                <Icon name='window close' />
                Close
            </Menu.Item>
        </div>
        
    );
}

export default SignedInMenu;

