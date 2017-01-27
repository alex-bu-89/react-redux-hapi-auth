import React from 'react'
import Navigation from './navigation.js';
import { connect } from 'react-redux';
require("./app.sass");

/**
 * App component
 */
class App extends React.Component {
  render () {
    return (
      <div className="app">
        <Navigation />
        <div className="content container-fluid wrapper">
          { this.props.children }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authenticationReducer.isAuthenticated
});

export default connect(mapStateToProps)(App);
