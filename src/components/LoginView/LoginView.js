import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';


const LoginForm = ({ bodyMargin }) => (
  <div style={{marginTop: '6em', marginLeft: '20px', marginRight: '20px'}} className='login-form'>
    
    
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header textAlign='center'>
          <h2 className='header-styled-text'>Log-in to your account</h2>
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button color='teal' fluid size='large'>
                <span className='header-styled-text'>Login</span>
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to='/signup'>Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default LoginForm
