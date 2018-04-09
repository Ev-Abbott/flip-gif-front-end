import React, { Component } from 'react';
import { Sidebar, Segment, Icon, Button, Header, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

const SignedOutMenu = ({ toggleVisibility, history }) => {
    return (
        <div>
            <Link to='/'>
                <Menu.Item name='home' onClick={toggleVisibility}>
                    <Icon name='home' />
                    Home
                </Menu.Item>
            </Link>
            <Link to='/login'>
                <Menu.Item name='login' onClick={toggleVisibility}>
                    <Icon name='sign in' />
                    Login
                </Menu.Item>
            </Link>
            <Link to='/signup'>
                <Menu.Item name='register' onClick={toggleVisibility}>
                    <Icon name='idea' />
                    Sign Up!
                </Menu.Item>
            </Link>
            <Menu.Item name='close' onClick={toggleVisibility}>
                <Icon name='window close' />
                Close
            </Menu.Item>
        </div>
        
    );
}

export default withRouter(SignedOutMenu);