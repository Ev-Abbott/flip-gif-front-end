import React, { Component } from 'react';
import { Sidebar, Segment, Icon, Button, Header, Container, Dropdown, Image, Menu } from 'semantic-ui-react';

const SignedOutMenu = ({ toggleVisibility }) => {
    return (
        <div>
            <Menu.Item name='home'>
                <Icon name='home' />
                Home
            </Menu.Item>
            <Menu.Item name='login'>
                <Icon name='sign in' />
                Login
            </Menu.Item>
            <Menu.Item name='register'>
                <Icon name='idea' />
                Sign Up!
            </Menu.Item>
            <Menu.Item name='close' onClick={toggleVisibility}>
                <Icon name='window close' />
                Close
            </Menu.Item>
        </div>
        
    );
}

export default SignedOutMenu;