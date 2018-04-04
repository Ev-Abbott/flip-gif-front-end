import React from 'react';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';

const HeaderBar = () => {
    return (
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='h3' header>
              <Image
                size='mini'
                src='/logo.png'
                style={{ marginRight: '1.5em' }}
              />
              <span className="header-styled-text">FlipGif   Studio</span>
            </Menu.Item>
            <Menu.Item as='a'>Home</Menu.Item>
          </Container>
        </Menu>
    );
}

export default HeaderBar;