import React from 'react'
import { Container, Segment, Header, Label, Button } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import paintBucket from '../DrawingTool/ToolSelector/paint-bucket.svg'
import '../DrawingTool/DrawingTool.css';

const TutorialView = ({ history }) => {
    const token = localStorage.getItem('token');
    if (!token) history.push('/');
    return (
        <Container textAlign='center' style={{ marginTop: '5em'}}>
            
            <Header as='h1'><span className='header-styled-text'>How to Use FlipGif Studio</span></Header>
            <Segment>
                <Header as='h2'><span className='header-styled-text'>Drawing Tools</span></Header>
                <div className='flex-container flex-column justify-content-center flex-wrap'>
                    <div className='flex-container flex-row justify-content-space-between align-items-center'>
                        
                        
                        <div 
                            className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <i className='fas fa-paint-brush fa-2x'></i>
                        </div>
                        <p>Set the stroke to defined color and size.</p>
                       
                    </div>
                    <div className='flex-container flex-row justify-content-space-between align-items-center'>
                        
                        <div 
                            className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <i className="fas fa-eraser fa-2x"></i>
                        </div>
                        <p>Set the stroke to transparent.</p>
                    </div>
                    <div className='flex-container flex-row justify-content-space-between align-items-center'>
                        
                        <div 
                            className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <img src={paintBucket} alt='Paint Bucket' width='28' height='28.5'/>
                        </div>
                        <p>Fills selection with defined color.</p>
                    </div>
                    <div className='flex-container flex-row justify-content-space-between align-items-center'>
                        
                        <div 
                            className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <i className="fas fa-bomb fa-2x"></i>
                        </div>
                        <p>Fills entire canvas with transparency.</p>
                    </div>
                    <div className='flex-container flex-row justify-content-space-between align-items-center'>
                        <div 
                            className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <i className="fas fa-undo fa-2x"></i>
                        </div>
                        <p>Undos previous action. (Frame only)</p>
                    </div>
                    <div className='flex-container flex-row justify-content-space-between align-items-center'>
                        <div 
                            className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <i className="fas fa-redo fa-2x"></i>
                        </div>
                        <p>Redos previous action. (Frame only)</p>
                    </div>
                </div>
            </Segment>
            <Link to='/draw'>
                <Button color='teal' fluid size='large'>
                    <span className='header-styled-text'>Let's Draw!</span>
                </Button>
            </Link>
            <Segment>
                <Header as='h2'><span className='header-styled-text'>Animation Tools</span></Header>
                <div className='flex-container flex-column justify-content-center flex-wrap'>
                    <div className='flex-container flex-row justify-content-space-between align-items-center'>
                        <div 
                        className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <i className='fas fa-play fa-2x'></i>
                        </div>
                        <p>Creates gif and plays it in the browser.</p>
                    </div>
                    <div className='flex-container flex-row justify-content-space-between align-items-center'>
                        <div 
                            className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <i className="fas fa-save fa-2x"></i>
                        </div>
                        <p>Saves current frame to the server.</p>
                    </div>
                    <div className='flex-container flex-row justify-content-space-between align-items-center'>
                        <div 
                            className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <i className="fas fa-plus-circle fa-2x"></i>
                        </div>
                        <p>Creates a new frame with a copy of the frame you are on.</p>
                    </div>
                    <div className='flex-container flex-row justify-content-space-between align-items-center'>
                        <div 
                            className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <i className="fas fa-trash-alt fa-2x"></i>
                        </div>
                        <p>Deletes current frame from the server.</p>
                    </div>
                    <div className='flex-container flex-row justify-content-space-between align-items-center'>
                        <div 
                            className='DrawingTool-iconContainer flex-container justify-content-center align-items-center'>
                            <i className="far fa-lightbulb fa-2x"></i>
                        </div>
                        <p>Shows transparencies of frames left and right.</p>
                    </div>
                </div>
            </Segment>
            <Link to='/draw'>
                <Button color='teal' fluid size='large'>
                    <span className='header-styled-text'>Let's Draw!</span>
                </Button>
            </Link>
        </Container>
    );
}

export default withRouter(TutorialView);