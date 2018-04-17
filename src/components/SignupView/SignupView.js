import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFlipbook } from '../../actions';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

const BaseUrl = 'http://localhost:8080';

class SignupForm extends Component {
    state = {
        username: '',
        password: '',
        password2: '',
        error: ''
    }

    componentDidMount () {
        let token = localStorage.getItem('token');
        if (token) this.props.history.push('/');
    }
    
    handleChange = (e, {name, value }) => this.setState({ [name]: value });

    handleSubmit = (history) => {
        const { username, password, password2 } = this.state;
        if (password !== password2) {
            return this.setState({ error: 'Passwords do not match.' });
        } 
        return axios.post(`${BaseUrl}/users/signup`, { username: username.toLowerCase(), password} )
            .then(res => {
                const token = res.headers.auth.split(' ')[1];
                localStorage.setItem('token', token);
                localStorage.setItem('user_id', res.data.flipbook.user_id);
                this.props.setFlipbook(res.data.flipbook.name);
                history.push('/tutorial');
            })
            .catch(err => {
                this.setState({ error: 'Username already exists.' });
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
                    <h2 className='header-styled-text'>Signup to Flip Gif</h2>
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
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            name='password2'
                            value={this.state.password2}
                            onChange={this.handleChange}
                            placeholder='Retype Password'
                            type='password'
                            required
                        />
                        <Button color='teal' fluid size='large'>
                            <span className='header-styled-text'>Sign Up</span>
                        </Button>
                        
                        
                        <Message error>
                            <Message.Header>
                                <span className='header-styled-text'>Invalid Signup</span>
                            </Message.Header>
                            <Message.Content>
                                {this.state.error}
                            </Message.Content>
                        </Message>
                    </Segment>
                </Form>
                <Message>
                    Already have an account? <Link to='/login'>Log In</Link>
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
    setFlipbook
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm));

