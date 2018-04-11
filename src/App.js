import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Sidebar, Menu, Dimmer, Icon, Header } from 'semantic-ui-react';
import Notification from 'react-notify-toast';
import HeaderBar from './components/HeaderBar/HeaderBar';
import FooterBar from './components/FooterBar/FooterBar';
import HomePage from './components/HomePage/Homepage';
import DrawingTool from './components/DrawingTool/DrawingTool';
import LoginView from './components/LoginView/LoginView';
import SignupView from './components/SignupView/SignupView';

import SignedInMenu from './components/MenuBar/SignedInMenu';
import SignedOutMenu from './components/MenuBar/SignedOutMenu';


import './App.css';

class App extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const bodyMargin = { marginTop: '3em' };
    const token = localStorage.getItem('token');
    
    return (
      <Router>
        <div>
          <Dimmer active={this.props.dimmerVisible}
            page
          >
            <Header as='h2' icon inverted style={{ position: 'relative', top: '30vh'}}> 
              <Icon name='paint brush' loading />
              Loading...
            </Header>
          </Dimmer>
          <Notification options={{zIndex: 5000}} />
          <Sidebar.Pushable style={{minHeight: '100vh'}}>
            <Sidebar
              as={Menu}
              animation='overlay'
              width='thin'
              direction='right'
              visible={this.state.visible}
              icon='labeled'
              vertical
              inverted
            >

              { token ? <SignedInMenu toggleVisibility={this.toggleVisibility} /> : <SignedOutMenu toggleVisibility={this.toggleVisibility} />}
            </Sidebar>
            <Sidebar.Pusher>
              <div style={{minHeight: '150vh'}}>
                <HeaderBar toggleVisibility={this.toggleVisibility} />
                <Switch>
                  <Route path="/login" render={() => <LoginView />} /> 
                  <Route path="/signup" render={() => <SignupView />} /> 
                  <Route path="/draw" render={ () => <DrawingTool bodyMargin={bodyMargin} />} />
                  <Route path="/" render={ () => <HomePage bodyMargin={bodyMargin} />} />
                </Switch>
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
    dimmerVisible: state.dimmer
});

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
