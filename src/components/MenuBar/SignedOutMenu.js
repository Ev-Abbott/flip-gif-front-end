import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

const SignedOutMenu = ({ toggleVisibility, history }) => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 110}} >
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