import React from 'react'
import {connect} from 'react-redux';

@connect((state) => {
  return {
    isAuthenticated: state.authenticationReducer.isAuthenticated
  };
})
export default class App extends React.Component {
  render () {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}
