import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';

const DrawingTool = ({ bodyMargin }) => {
    return (
        <Container style={bodyMargin}>
            <Header as='h1'>My Drawing Tool</Header>
        </Container>
    );
}

export default DrawingTool;