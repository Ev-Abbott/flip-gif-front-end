import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class HeaderBar extends Component {
  render() {
    return (
      <div>
        <Menu
          fixed='top'
          inverted>
          <Container>
            <Link to="/">
              <Menu.Item as='h3' header>
                <span className="header-styled-text">FlipGif Studio</span>
              </Menu.Item>
            </Link>
            
            <Menu.Item as='a' onClick={this.props.toggleVisibility} position='right'>
              <i className="fas fa-bars"></i>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
      
    );
  }
}

export default HeaderBar;