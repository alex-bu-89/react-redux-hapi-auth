import React from 'react'
import { connect } from 'react-redux';
import Navigation from './navigation.js';
require("./app.sass");

connect((state) => {
  return {
    isAuthenticated: state.authenticationReducer.isAuthenticated
  };
})
export default class App extends React.Component {
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
