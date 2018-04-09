import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFlipbookName } from '../../actions';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

const BaseUrl = 'http://localhost:8080';

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        error: ''
    }

    handleChange = (e, {name, value }) => this.setState({ [name]: value });

    handleSubmit = (history) => {
        const { username, password } = this.state;
        return axios.post(`${BaseUrl}/users/login`, { username: username.toLowerCase(), password} )
            .then(res => {
                const token = res.headers.auth.split(' ')[1];
                localStorage.setItem('token', token);
                this.props.setFlipbookName(res.data.flipbook.name);
                history.push('/draw');
            })
            .catch(err => {
                this.setState({ error: 'Username or password is incorred.' });
            });
    }

    render () {
        return (
            <div style={{marginTop: '6em', marginLeft: '20px', marginRight: '20px'}} className='login-form'>
            <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header textAlign='center'>
                    <h2 className='header-styled-text'>Login to Flip Gif</h2>
                </Header>
                <Form error={this.state.error.length !== 0} size='large' onSubmit={() => this.handleSubmit(this.props.history)}>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            name='username'
                            value={this.state.username}
                            onChange={this.handleChange}
                            placeholder='Username'
                            required
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder='Password'
                            type='password'
                            required
                        />
                        <Button color='teal' fluid size='large'>
                            <span className='header-styled-text'>Log In</span>
                        </Button>
                        
                        
                        <Message error>
                            <Message.Header>
                                <span className='header-styled-text'>Invalid Login</span>
                            </Message.Header>
                            <Message.Content>
                                {this.state.error}
                            </Message.Content>
                        </Message>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to='/signup'>Sign up</Link>
                </Message>
                </Grid.Column>
            </Grid>
            </div>
        )
    }
}
    
const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setFlipbookName
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm));