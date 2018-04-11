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
            <Header as='h2'>Tools that might need explaining</Header>
                <div className='flex-container flex-row'>
                    <div className='DrawingTool-iconContainer flex-container flex-column justify-content-center align-items-center'>
                        <i className="fas fa-bomb fa-2x"></i>
                        <p>Tool to Clear the Canvas</p>
                    </div>
                    <div className='DrawingTool-iconContainer flex-container flex-column justify-content-center align-items-center'>
                        <i className="fas fa-plus-circle fa-2x"></i>
                        <p>Creates new Frame with a copy of what is on the canvas</p>
                    </div>
                    <div className='DrawingTool-iconContainer flex-container flex-column justify-content-center align-items-center'>
                        <i className="fas fa-trash-alt fa-2x"></i>
                        <p>Permanently Deletes a Frame</p>
                    </div>
                    <div className='DrawingTool-iconContainer flex-container flex-column justify-content-center align-items-center'>
                        <i className="far fa-lightbulb fa-2x"></i>
                        <p>Turns on Transparency tool</p>
                    </div>
                </div>
            <hr />
            <Header as='h2'>Quirks about the app</Header>
            <ul>
                <li>This is a touch only app and is optimized for the phone. A mouse WIL NOT WORK. A pen with one of those rubber tipped styluses is preferred.</li>
                <li>There is one flipbook per user. You will need to create a new user to make a new flipbook at this time.</li>
                <li>You need internet in order to use the app (for image saving purposes)</li>
                <li>if the connection is slow, use wifi, it is a lot faster</li>
                <li>Undo and Redo are only specific to your frame</li>
                <li>When you toggle frames, it saves the last frame you were on to the database</li>
                <li>Sometimes you have to wait for the frame count to update when you first log in to toggle</li>
                <li>Make sure you save before you refresh the page or play the animation button</li>
                <li>Frame rate is 12 frame per second</li>
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