import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';

const BaseUrl = 'http://localhost:8000';

const HomePage = ({ bodyMargin }) => {
    return (
        <Container text style={bodyMargin}>
            <Header as='h1'>Alpha Testers - READ THIS IF IT IS YOUR FIRST TIME HERE</Header>
            <Header as='h2'>If you do not have an account, click the hamburger and signup. Otherwise,
            click the hamburger to login in. You need an account to create a flipbook.</Header>
            <hr />
            <Header as='h2'>Quirks about the app</Header>
            <ul>
                <li>This is a touch only app and is optimized for the phone. A mouse WIL NOT WORK. A pen with one of those rubber tipped styluses is preferred.</li>
                <li>You need internet in order to use the app (for image saving purposes)</li>
                if the connection is slow, use wifi, it is a lot faster
                <li>Undo and Redo are only specific to your frame</li>
                <li>When you toggle frames, it saves the last frame you were on to the database</li>
                <li>Sometimes you have to wait for the frame count to update when you first log in to toggle</li>
                <li>Make sure you save before you refresh the page or play the animation button</li>
                <li>The brush size has to be a number between 1-99</li>
                <li>Lightbox goes left and right given a number of frames upto 20</li>
                <li>Don’t worry about little white outlines with the fill tool, the gif converter fixes them</li>
                <li>Let me know if you find any bugs or weird behaviors</li>
            </ul>
            <Header as='h1'>Happy CREATING! -Everett</Header>
        </Container>
    );
}

export default HomePage;