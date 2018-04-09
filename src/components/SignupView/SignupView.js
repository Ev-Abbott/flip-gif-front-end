import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';


const SignupForm = ({ bodyMargin }) => (
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
              icon='user'
              iconPosition='left'
              placeholder='Username'
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button color='teal' fluid size='large'>
                <span className='header-styled-text'>Sign Up</span>
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to='/login'>Log In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default SignupForm