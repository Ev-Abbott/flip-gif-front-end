import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

class SignedInMenu extends Component {
    signOut = (toggleVisibility, history) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        toggleVisibility();
        history.push('/');
    }
    render() {
        return (
            <div>
                <Link to='/'>
                    <Menu.Item name='home' onClick={this.props.toggleVisibility}>
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                </Link>
                <Link to='/draw'>
                    <Menu.Item name='draw' onClick={this.props.toggleVisibility}>
                        <Icon name='paint brush' />
                        Let's Draw!
                    </Menu.Item>
                </Link>
                
                <Menu.Item name='logout' onClick={() => this.signOut(this.props.toggleVisibility, this.props.history)}>
                    <Icon name='sign out' />
                    Sign Out
                </Menu.Item>
                
                <Menu.Item name='close' onClick={this.props.toggleVisibility}>
                    <Icon name='window close' />
                    Close
                </Menu.Item>
            </div>
            
        );
    }
}

export default withRouter(SignedInMenu);

