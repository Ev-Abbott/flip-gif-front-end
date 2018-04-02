import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderBar from './components/HeaderBar/HeaderBar';
import FooterBar from './components/FooterBar/FooterBar';
import HomePage from './components/HomePage/Homepage';
import DrawingTool from './components/DrawingTool/DrawingTool';
import './App.css';

class App extends Component {
  render() {
    const bodyMargin = { marginTop: '3em' };
    return (
      <Router>
        <div>
          <HeaderBar />
          <Switch>
            <Route path="/draw" render={ () => <DrawingTool bodyMargin={bodyMargin} />} />
            <Route path="/" render={ () => <HomePage bodyMargin={bodyMargin} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => bindActionCreators({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
